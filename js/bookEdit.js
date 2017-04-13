import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { addBook, editBook } from './actions/books';
import commonStyles from './styles/common';
import styles from './styles/bookEdit';
import ErrorableTextInput from './errorableTextInput';

class BookEdit extends Component {
  state = {
    book: {
      title: '',
      author: '',
    },
    edit: false,
    addBook: this.handleAddBook.bind(this),
    editBook: this.handleEditBook.bind(this),
  }
  static navigationOptions = {
    title: ({ state }) => state.params && state.params.book ? 'Edit book' : 'New book',
  };

  componentWillMount() {
    const { params } = this.props.navigation.state;
    if (params && params.book) {
      // store info about edited book (if the book instance was passed through navigation for editing purpose)
      this.setState({
          book: {...params.book},
          edit: true
      });
    }
  }
  isEditingBook() {
    return this.state.edit;
  }
  handleEditBook() {
    this.props.editBook(this.state.book);
    this.showMessage('Changes saved correctly!');
  }
  handleAddBook() {
    this.props.addBook(this.state.book);
    this.showMessage('Book added correctly!');
  }
  showMessage(msg) {
    if (Platform.OS === 'android') {
      /* CustomToastAndroid is a name of the CustomToastModule class defined here 'android/app/src/main/java/com/awesomeproject/CustomToastModule.java' 
        with the name given in overrided method 'getName()''
        Methods available in JavaScript code are annotated with @ReactMethod in the above Java class.
        In addition, there are also constants available like 'CustomToastAndroid.SHORT' listed in the overrided method 'getConstants()' in the above Java class.
      */
      const CustomToastAndroid = require('./native.android').CustomToastAndroid;
      CustomToastAndroid.show(msg, CustomToastAndroid.SHORT);
    }
  }
  validateInputs() {
    let valid = true;
    this.refs.bookTitle.setError(null);
    this.refs.bookAuthor.setError(null);
    if (!this.state.book.title) {
      valid = false;
      this.refs.bookTitle.setError('Book needs to have a title');
      this.refs.bookTitle.focus();
    }
    if (!this.state.book.author) {
      valid = false;
      if (ErrorableTextInput.supportsInlineErrorText()) {
        // show second error only if we can display two errors at a time (it's silly to display two overlapping alerts)
        this.refs.bookAuthor.setError('Book needs to have an author');
        this.refs.bookAuthor.focus();
      }
    }
    return valid;
  }

  render() {
    return (
      <View style={commonStyles.mainContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.label}>Title</Text>
          <ErrorableTextInput 
            ref='bookTitle'
            style={styles.input} 
            value={this.state.book.title}
            onChangeText={(text) => this.setState({
              book: {
                ...this.state.book,
                title: text
              }
            })}/>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.label}>Author</Text>
          <ErrorableTextInput 
            ref='bookAuthor'
            style={styles.input} 
            value={this.state.book.author}
            onChangeText={(text) => this.setState({
              book: {
                ...this.state.book,
                author: text
              }
            })}/>
        </View>
        <View style={{ margin: 20 }}>
          <Button
            onPress={() => this.validateInputs() ? (this.isEditingBook() ? this.handleEditBook() : this.handleAddBook()) : {}}
            title={this.isEditingBook() ? 'Save changes' : 'Add book'}
          />
        </View>
      </View>
    );
  }
}

function actions(dispatch) {
  return {
    addBook: (book) => dispatch(addBook(book)),
    editBook: (book) => dispatch(editBook(book)),
  };
}

module.exports = connect(null, actions)(BookEdit);