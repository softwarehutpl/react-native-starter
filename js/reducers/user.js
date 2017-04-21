// @flow

'use strict';

import type {Gender} from '../types/user';
import type {Action} from '../types/action';

type State = {
  gender: Gender
}

const initialState = {
  gender: 'male'
}

/* More on initial state can be read on 'js/reducers/books.js' file. */
function user(state: State = initialState, action: Action): State {
  if (action.type === 'CHANGE_GENDER') {
    return {
      ...state,
      gender: action.gender
    } 
  }
  return state;
}

module.exports = user;
