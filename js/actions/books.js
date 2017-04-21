// @flow

'use strict';

import type {Book} from '../types/book';
import type {Action} from '../types/action';

function addBook(book: Book): Action {
  return {
    type: 'ADD_BOOK',
    book: book,
  }
}

function editBook(book: Book): Action {
  return {
    type: 'EDIT_BOOK',
    book: book,
  }
}

function removeBook(book: Book): Action {
  return {
    type: 'REMOVE_BOOK',
    book: book,
  }
}

module.exports = {
  addBook,
  editBook,
  removeBook,
};