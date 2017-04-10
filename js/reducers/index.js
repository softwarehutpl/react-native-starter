import { combineReducers } from 'redux';

module.exports = combineReducers({
  books: require('./books'),
  user: require('./user')
});