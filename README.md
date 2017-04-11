# react-native-starter
This project helps you get started with [React Native](https://facebook.github.io/react-native/) and [Redux](http://redux.js.org/) (including offline storage using [redux-persist](https://github.com/rt2zz/redux-persist)). It also uses [React Navigation](https://reactnavigation.org/) module which handles in-app navigation.

The project assumes that the person reading this knows **basics** of:
* [React](https://facebook.github.io/react/)
* [Flexbox layout](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) as it's the only available layout on React Native at the moment of writing this README. There are only a few small differences between CSS Flexbox layout and React Native Flexbox layout and they are described [here](https://facebook.github.io/react-native/docs/flexbox.html)
* ES6 ([ES2015](https://babeljs.io/learn-es2015/)) as React Native ships with the support of this set of improvements which are commonly used in the project and all the tutorials over the internet

The project was created and tested on Linux-based system and Android. The iOS part of the project (`ios` folder) was created automatically by React Native init script and it wasn't modified and tested.

# Get started
* Clone this project to your local computer
* Follow the installation steps from React Native project site - [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html)
* Navigate to the cloned project's directory
* Run `npm install` to install necessary packages (listed on `package.json` file) and their dependencies
* Run development server using `react-native start --reset-cache` to be able to debug the JavaScript code from your Chrome browser. More info on debugging React Native apps [here](https://facebook.github.io/react-native/docs/debugging.html)
* Run Android emulator or connect your real device through USB to your computer to install the build using `react-native run-android`
* The app flow begins from either `index.android.js` file or `index.ios.js` file depending on the platform.
* Enjoy!