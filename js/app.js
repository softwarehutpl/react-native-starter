import { StackNavigator } from 'react-navigation';
import HomeScreen from './home';
import BooksList from './booksList';
import BookEdit from './bookEdit';

// first entry in StackNavigator is the screen which fires first
const App = StackNavigator({
  Home: { screen: HomeScreen },
  BooksList: { screen: BooksList },
  BookEdit: { screen: BookEdit },
});

module.exports = App;