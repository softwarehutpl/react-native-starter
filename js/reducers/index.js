import { combineReducers } from 'redux';

// defines all available reducers
module.exports = combineReducers({
  books: require('./books'),
  user: require('./user')
});