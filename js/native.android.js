import { PropTypes } from 'react';
import { 
  NativeModules,
  requireNativeComponent, 
  TextInput
} from 'react-native';


var errorableEditTextInterface = {
  name: 'ErrorableEditText',
  propTypes: {
    errorText: PropTypes.string,
    text: PropTypes.string,
    mostRecentEventCount: PropTypes.number,
    allowFontScaling: PropTypes.bool,
    ...TextInput.propTypes // include the default TextInput properties
  },
};

const ErrorableEditText = requireNativeComponent('ErrorableEditText', errorableEditTextInterface);
const CustomToastAndroid = NativeModules.CustomToastAndroid;
const AppLifecycleAndroid = NativeModules.AppLifecycleAndroid;

module.exports = {
  AppLifecycleAndroid,
  CustomToastAndroid,
  ErrorableEditText
}