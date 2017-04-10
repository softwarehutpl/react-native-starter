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

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  state = { 
    language: 'js',
    gender: this.props.gender,
    changeGender: this.handleGenderChange.bind(this)
  }

  handleGenderChange(gender) {
    this.setState({gender: gender});
    this.props.changeGender(gender);
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
            onValueChange={(lang) => this.setState({language: lang})}>
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


module.exports = connect(select, actions)(HomeScreen);