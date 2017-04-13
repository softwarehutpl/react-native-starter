import { combineReducers } from 'redux';

// defines all available reducers
module.exports = combineReducers({
  nav: require('./navigation'),
  books: require('./books'),
  user: require('./user'),
});