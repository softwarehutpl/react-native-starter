import { createStore, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import React from 'react';
import { Provider } from 'react-redux';
import { AsyncStorage, View } from 'react-native';
import App from '../js/app';
import reducers from '../js/reducers';

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

function setup() {

  class Root extends React.Component {
    state = {
      rehydrated: false,
      store: this._configureStore(() => { this.setState({ rehydrated: true })}),
    };

    _configureStore(onComplete) {
      const store = compose(autoRehydrate())(createStore)(reducers, initialState);
      persistStore(store, {storage: AsyncStorage}, onComplete);
      return store;
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
          <App />
        </Provider>
      );
    }
  }

  return Root;
}

module.exports = setup;