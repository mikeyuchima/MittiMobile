import {
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import * as colors from './colors';

const {width, height} = Dimensions.get('window');

export default styles = StyleSheet.create({
  // --- page helpers
  topWithNavBar: {
    ...Platform.select({
      ios: {
        marginTop: 64,
      },
      android: {
        marginTop: 54,
      },
      windows: {
        marginTop: 54,
      },
    }),
  },
  bottomScrollExtra: {
    paddingBottom: 50,
  },

  // --- input helpers
  input: {
    width: width * 0.95,
  },
  button: {
    width: width * 0.90,
  },
  textBold: {
    fontWeight: 'bold',
  },
  navbarButtonContainer: {
    width: 30,
    height: 30,
    alignItems: 'flex-end',
  },

  // --- dark theme
  darkBody: {
    backgroundColor: '#181A20'
  },
  darkFont: {
    color: '#BFBFBF',
  },
  darkFontStrong: {
    color: '#FFFFFF',
  },
  darkFontWeak: {
    color: '#545556',
  },

  // --- white theme
  whiteBody: {
    backgroundColor: '#FFFFFF'
  },
  whiteFont: {
    color: '#73767B',
  },
  whiteFontStrong: {
    color: '#000000',
  },
  whiteFontWeak: {
    color: '#C2C2C2',
  }
});
