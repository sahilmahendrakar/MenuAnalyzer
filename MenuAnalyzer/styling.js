import { Platform } from 'react-native';

export default {
    primaryColor: '#ffdcad', // or 73db8d
    secondaryColor: '#fb5b5a',

    ...Platform.select({
        ios: {
          mainFont: 'Avenir'
        },
        android: {
          mainFont: 'Roboto'
        },
        default: {
          // other platforms, web for example
          mainFont: 'serif'
        }
      })
}