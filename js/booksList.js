import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  Button,
  TouchableNativeFeedback,
  View,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import commonStyles from './styles/common';
import styles from './styles/bookList';
import { removeBook } from './actions/books';

class BooksList extends Component {
  static navigationOptions = {
    title: 'Books list',
    header: ({navigate}) => {
      let right = (
      	<Button title="Add book" onPress={() => navigate('BookEdit')} />
  	  );
  	  return {right};
    }
  };

  handleBookLongPress = (book) => {
    Alert.alert(
      'Confirm delete',
      `Are you sure you want to delete the following book?\nTitle: ${book.title}\nAuthor: ${book.author}\n`,
      [
        {text: 'No'},
        {text: 'Yes', onPress: () => this.handleBookDelete(book)}
      ]
    );
  }

  handleBookDelete(book) {
    this.props.removeBook(book);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={[commonStyles.mainContainer, styles.listContainer]}>
        <View style={styles.tableHeaderContainer}>
          <Text style={styles.tableHeaderItem}>Title</Text>
          <Text style={styles.tableHeaderItem}>Author</Text>
        </View>
        <SeparatorComponent/>
        <FlatList
          ref="flatList"
          data={this.props.books}
          initialNumToRender={30}
          ItemSeparatorComponent={SeparatorComponent}
          renderItem={({item}) => 
            <TouchableNativeFeedback 
              onPress={() => navigate('BookEdit', { book: item })}
              onLongPress={() => this.handleBookLongPress(item)}
              >
              <View style={styles.tableRowContainer}>
                <Text style={styles.tableRowItem}>{item.title}</Text>
                <Text style={styles.tableRowItem}>{item.author}</Text>
              </View>
            </TouchableNativeFeedback>
          }
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

class SeparatorComponent extends React.PureComponent {
  render() {
    return <View style={styles.listSeparator} />;
  }
}

function select(store) {
  return {
    books: store.books.books,
  };
}

function actions(dispatch) {
  return {
    removeBook: (book) => dispatch(removeBook(book)),
  };
}

module.exports = connect(select, actions)(BooksList);