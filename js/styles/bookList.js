import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  listSeparator: {
  	height: 1,
  	backgroundColor: 'black',
  },
  tableHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    paddingVertical: 15
  },
  tableRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableHeaderItem: {
    fontWeight: 'bold',
    flexGrow: 1,
    flexBasis: 0,
    textAlign: 'center',
  },
  tableRowItem: {
    flexGrow: 1,
    flexBasis: 0,
    textAlign: 'center',
  },
});