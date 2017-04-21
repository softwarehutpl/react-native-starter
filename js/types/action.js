// @flow

'use strict';

import type {Book} from './book';
import type {Gender} from './user';

export type Action =
    { type: 'ADD_BOOK', book: Book }
  | { type: 'EDIT_BOOK', book: Book }
  | { type: 'REMOVE_BOOK', book: Book }
  | { type: 'CHANGE_GENDER', gender: Gender }
  ;