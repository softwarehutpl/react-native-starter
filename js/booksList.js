import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  Button,
  TouchableNativeFeedback,
  View
} from 'react-native';
import { connect } from 'react-redux';
import commonStyles from './styles/common';
import styles from './styles/bookList';

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
          ItemSeparatorComponent={SeparatorComponent}
          renderItem={({item}) => 
            <TouchableNativeFeedback onPress={() => navigate('BookEdit', { book: item })}>
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

module.exports = connect(select)(BooksList);