import { Dimensions, StyleSheet } from 'react-native';

const DEFAULT_HEIGHT = 50;
const { width } = Dimensions.get('window');
const DEFAULT_SHOW_PASSWORD_WIDTH = DEFAULT_HEIGHT * 1.25;

export default StyleSheet.create({
  container: {
    minWidth: width / 1.5,
    height: DEFAULT_HEIGHT,
    borderRadius: DEFAULT_HEIGHT / 2,
    color: 'black',
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: DEFAULT_SHOW_PASSWORD_WIDTH,
  },
  errorInputContainer: {
    borderColor: 'red',
  },
  showPasswordButton: {
    width: DEFAULT_SHOW_PASSWORD_WIDTH,
    height: DEFAULT_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
  },
});
