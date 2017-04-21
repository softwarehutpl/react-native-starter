/* Each reducer needs to have initial state (if not given) to know what kind of data it can expect.
  The initial state can be given during creating a store ('setup.js' file) and we are putting some tests book there
  but if we wouldn't do that then the state would be undefined (the state needs to be at least empty object {}).
  In addition, we need to return a new state object (and copy all other state properties if they would be any)
  by using the immutable update patterns (http://redux.js.org/docs/recipes/reducers/ImmutableUpdatePatterns.html)
*/
// @flow

'use strict';

import type {Book} from '../types/book';
import type {Action} from '../types/action';

type State = {
  books: Array<Book>
}

const initialState = {
  books: []
}

function books(state: State = initialState, action: Action): State {
  if (action.type === 'ADD_BOOK') {
    return {
      ...state,
      books: addBook(action.book, state.books)
    }
  } else if (action.type === 'EDIT_BOOK') {
    return {
      ...state,
      books: editBook(action.book, state.books)
    }
  } else if (action.type === 'REMOVE_BOOK') {
    return {
      ...state,
      books: removeBook(action.book, state.books)
    }
  }
  return state;
}

/* Adds a new book to the end of the list of books and creates a new list to make sure the list won't be shallow-equal
  and the change will be automatically discovered by the React Native's components and the view will be automatically updated.
*/
function addBook(book: Book, list) {
  book.id = getNextBookId(list);
  return [...list, Object.assign({}, book)]; // we need to create copy of the book of otherwise we can have duplicates in the list if someone will try to add the same book a few times
}

/* Edits book by copying all object's properties and creates a new list to make sure the list won't be shallow-equal
  and the change will be automatically discovered by the React Native's components and the view will be automatically updated.
*/
function editBook(book, list) {
  for (let listBook of list) {
    if (listBook.id === book.id) {
      Object.assign(listBook, book);
      break;
    }
  }
  return [...list];
}

function removeBook(book, list) {
  return list.filter((obj) => obj.id !== book.id);
}

function getNextBookId(list) {
  let highestId = -1;
  for (let book of list) {
    if (book.id > highestId) {
      highestId = book.id;
    }
  }
  return highestId + 1;
}

module.exports = books;
