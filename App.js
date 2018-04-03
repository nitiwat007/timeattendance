import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'remote-redux-devtools'

import rootReducer from './store/rootReducer'
import { Router } from 'react-native-router-flux'
import RouterComponent from './routers/RouterComponent'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
  //composeWithDevTools(applyMiddleware(thunk))
)

export default class App extends React.Component {

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  render() {
    return (
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
