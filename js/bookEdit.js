import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Alert,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { addBook, editBook } from './actions/books';
import commonStyles from './styles/common';
import styles from './styles/bookEdit';

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
  componentDidMount() {
    const { params } = this.props.navigation.state;
    if (params && params.book) {
      // store info about edited book (if the book instance was passed through navigation for editing purpose)
      this.setState({
          book: {
            id: params.book.id,
            title: params.book.title,
            author: params.book.author
          },
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
    if (this.refs.bookTitle.props.value && this.refs.bookAuthor.props.value) {
      return true;
    }
    //TODO: extend TextInput for Android and add method setError() which will show error inside the native TextInput
    Alert.alert(
      'Error',
      'Book needs to have the title and author'
    );
    return false;
  }

  render() {
    return (
      <View style={commonStyles.mainContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.label}>Title</Text>
          <TextInput 
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
          <TextInput 
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