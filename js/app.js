// @flow

'use strict';

import React, { Component } from 'react';
import { 
  StackNavigator,
  addNavigationHelpers
 } from 'react-navigation';
import { connect } from 'react-redux';
import HomeScreen from './home';
import BooksList from './booksList';
import BookEdit from './bookEdit';

// first entry in StackNavigator is the screen which fires first
const App = StackNavigator({
  Home: { screen: HomeScreen },
  BooksList: { screen: BooksList },
  BookEdit: { screen: BookEdit },
});

// wrap main navigation component with helper methods in order to integrate the React Navigation with redux https://reactnavigation.org/docs/guides/redux
class AppWithNavigation extends Component {
  render() {
    return (
      <App navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })} />
    );
  }
}

const AppWithNavigationState = connect(
  state => ({
    nav: state.nav,
  }))(AppWithNavigation);


module.exports = {
  App,
  AppWithNavigationState,
};