// @flow

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  Picker,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { changeGender } from './actions/user';
import commonStyles from './styles/common';
import styles from './styles/home';

/* HomeScreen displays two pickers (among oter things).
  First of them (language picker) uses only component's state to hold the picker's state inside the component's state until the component is unmounted.
  Second one (gender picker) uses both component's state and redux store to make the gender available across the whole app and, in addition, save the picker's state in storage.
*/
class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  state = { 
    language: 'js', // initial value which isn't connected to the redux's store to show the difference between the React's state and redux with redux-persist state
    gender: this.props.gender, // initial gender defined in the default state of the user's reducer (js/reducers/user.js') or gender saved in the AsyncStorage (if changed)
    changeGender: this.handleGenderChange.bind(this)
  }

  handleGenderChange(gender) {
    this.setState({gender: gender});
    this.props.changeGender(gender); // fires dispatch action which calls the user's reducer which saves the gender in the store
  }

  handleLanguageChange(lang) {
    this.setState({language: lang});
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={[commonStyles.mainContainer, styles.container]}>
        <Text style={styles.welcomeText}>
          Hello, welcome in this test app!
        </Text>
        <View style={styles.pickerWithLabel}>
          <Text>Choose fav. language</Text>
          <Picker
            style={styles.picker}
            selectedValue={this.state.language}
            onValueChange={(lang) => this.handleLanguageChange(lang)}>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>
        <View style={styles.pickerWithLabel}>
          <Text>Choose gender (saves state)</Text>
          <Picker
            style={styles.picker}
            mode={'dropdown'}
            selectedValue={this.state.gender}
            onValueChange={(gender) => this.handleGenderChange(gender)}>
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Male" value="male" />
          </Picker>
        </View>
        <View style={{marginTop: 20}}/>
        <Button
          onPress={() => navigate('BooksList')}
          title="Go to books list"
        />
        <View style={{marginTop: 20}}/>
        <Button
          onPress={() => navigate('BookEdit')}
          title="Add new book"
        />
      </View>
    );
  }
}

function select(store) {
  return {
    gender: store.user.gender
  };
}

function actions(dispatch) {
  return {
    changeGender: (gender) => dispatch(changeGender(gender)),
  };
}

/* Method 'connect' populates data (initial or stored locally with redux-persist) listed in the 'select' method from the store 
  and saves them as component's (HomeScreen) properties. 
  In addition, it stores actions listed in the 'actions' method and makes them available through component's (HomeScreen) properties. 
*/
module.exports = connect(select, actions)(HomeScreen);