import { createStore, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import React from 'react';
import { Provider } from 'react-redux';
import { AsyncStorage, View, Platform, BackAndroid } from 'react-native';
import { AppWithNavigationState } from '../js/app';
import reducers from '../js/reducers';
import { NavigationActions } from 'react-navigation';

let initialBooks = [
  { id: 0,
    title: "Beyond the Mexique Bay",
    author: "Aldous Huxley" },
  { id: 1,
    title: "Cover Her Face",
    author: "P. D. James" },
]

for (let i = 0; i < 30; i++) {
  let initialRecord = initialBooks[i % 2];
  initialBooks.push({
    id: i + 2,
    title: initialRecord.title + ' ' + i,
    author: initialRecord.author + ' ' + i
  });
}

const initialState = {
  // name of the reducer
  books: {
    books: initialBooks
  },
}

const persistConfig = {
  storage: AsyncStorage
}

const APP_LOADED_TIMESTAMP_STORAGE_KEY = 'APP_LOADED_TIMESTAMP_STORAGE_KEY';

function setup() {

  class Root extends React.Component {
    state = {
      rehydrated: false,
      store: this._configureStore(() => { this._storeLoaded() } ),
    };

    _storeLoaded = async () => {
      if (Platform.OS === 'android') {

        /* When we've added integration with redux and redux-persist, the navigation state was correctly saved between the app runs.
           The problem is that when user restarts the app, it will automatically start on the screen where user was for the last time.
           It's nice feature but completetly different from the normal Android app point of view.
           We could disable saving the navigation state but it's good to leave it in case if Android would kill the app automatically
           (e.g. 'don't keep activities' developer option or when device is low on RAM) and restore it in the place where user was for
           the last time as the Android does in such cases.
           I've used a timestamp which doesn't change when app is automatically killed (please see the 'MainApplication.java' and
           'AppLifecycleModule.java' files for details on the Android implementation.).
        */

        const AppLifecycleAndroid = require('./native').AppLifecycleAndroid;
        const timestamp = await AppLifecycleAndroid.getAppLoadedTimestamp();
        let oldTimestamp = null;
        try {
          oldTimestamp = await AsyncStorage.getItem(APP_LOADED_TIMESTAMP_STORAGE_KEY);
        } catch (ignored) {}
        if (oldTimestamp !== timestamp) {
          try {
            await AsyncStorage.setItem(APP_LOADED_TIMESTAMP_STORAGE_KEY, timestamp);
          } catch (ignored) {}

          this._resetNavigationState();

          this._finishLoading();
        } else {
          this._finishLoading();
        }
      } else {

         // in case of iOS we always start the app's navigation from the beginning (default React Native Navigation beaviour)

        this._resetNavigationState();
        this._finishLoading();
      }
    }

    _resetNavigationState() {
      // resets navigation state in store
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home'}),
        ]
      })
      this.state.store.dispatch(resetAction);
    }

    _configureStore(onComplete) {
      const store = compose(autoRehydrate())(createStore)(reducers, initialState);
      persistStore(store, {storage: AsyncStorage}, onComplete);
      return store;
    }

    _finishLoading() {
      this.setState({ rehydrated: true });
    }

    componentDidMount() {
      // we have integrated React Navigation with redux so we need to implement our own handle of native back press button on Android
      // because otherwise native back button would always close the app instead of navigating to the previous screens
      BackAndroid.addEventListener('backPress', () => {
        if (this.state.store) {
          let storedState = this.state.store.getState();
          if (storedState.nav && 
              storedState.nav.routes && 
              storedState.nav.routes.length && 
              storedState.nav.routes[storedState.nav.index].routeName === 'Home') {
            // close the app if we are on the first screen
            return false;
          }
          const backAction = NavigationActions.back();
          this.state.store.dispatch(backAction);
          return true;
        } else {
          // if there is no store (not very likely) then close the app
          return false;
        }
      })
    }

    componentWillUnmount() {
      BackAndroid.removeEventListener('backPress');
    }

    render() {
      // loading data stored in AsyncStorage is asynchronous so we need to delay it until the rehydration completes (we can show some loading bar but it take just miliseconds so don't bother and display simple View)
      if(!this.state.rehydrated){
        return (
          <View/>
        );
      }
      return (
        <Provider store={this.state.store}>
          <AppWithNavigationState />
        </Provider>
      );
    }
  }

  return Root;
}

module.exports = setup;