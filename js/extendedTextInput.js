import React, {
  TextInput,
  Component,
  NativeModules
} from 'react-native';


class ExtendedTextInput extends Component {

  constructor(props) {
    super(props);
    this.setErrors
  }

  //exposing objective-c eval as evalScript
  evalScript(value) {
    var ref = this.refs.textInput._inputRef;
    WebViewManager.eval(ref._inputRef, value);
  }

  render() {
    return (
      <TextInput
        ref={'textInput'}
        {...this.props} />
    );
  }
}

module.exports = ExtendedTextInput;
