// @flow

'use strict';

import React, { Component } from 'react';
import { 
  TouchableWithoutFeedback,
  Alert,
  Platform,
  TextInput,
} from 'react-native';


class ErrorableTextInput extends Component {
  static supportsInlineErrorText() {
    return Platform.OS === 'android';
  }

  state = {
    errorText: this.props.errorText,
    value: this.props.value
  }

  componentWillUnmount() {
    // we need to blur the native input or otherwise when we enter the screen with this input the next time we would receive an error that view doesn't exist
    this.refs.input.blur();
  }

  setError(errorText: string) {
    if (ErrorableTextInput.supportsInlineErrorText()) {
      this.setState({ errorText: errorText });
    } else if (errorText) {
      Alert.alert(
        'Error',
        errorText
      );
    }
  }

  focus() {
    this.refs.input.focus();
  }

  _onPress = () => {
    this.refs.input.focus();
  }

  _onChange = (event) => {
    // when text changes in the native input we need to call onChangeText to update view's state in bookEdit.js
    this.props.onChangeText && this.props.onChangeText(event.nativeEvent.text);
  }

  render() {
    if (ErrorableTextInput.supportsInlineErrorText()) {
      const ErrorableEditText = require('./native.android').ErrorableEditText;
      return (
        <TouchableWithoutFeedback
          onPress={this._onPress}>
          <ErrorableEditText
            ref='input'
            onChange={this._onChange}
            errorText={this.state.errorText}
            text={this.state.value}
            {...this.props} />
        </TouchableWithoutFeedback>
      );
    } else {
     return (
        <TextInput
          {...this.props}
        />
      );
    }
  }
}

module.exports = ErrorableTextInput;
