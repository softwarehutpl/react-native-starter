function books(state = {books:[]}, action) {
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
  }
  return state;
}

function addBook(book, list) {
  book.id = getNextBookId(list);
  return [...list, book];
}

function editBook(book, list) {
  for (let listBook of list) {
    if (listBook.id === book.id) {
      Object.assign(listBook, book);
      break;
    }
  }
  return [...list];
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