function addBook(book) {
  return {
    type: 'ADD_BOOK',
    book: book,
  }
}

function editBook(book) {
  return {
    type: 'EDIT_BOOK',
    book: book,
  }
}

function removeBook(book) {
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