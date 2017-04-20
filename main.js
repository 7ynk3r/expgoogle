import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

async function signInWithGoogleAsync() {
  let result;
  try {
    result = await Expo.Google.logInAsync({
      androidClientId: '11205182979-q2f64kp38f6bfei86t16eerdojlutovt.apps.googleusercontent.com',
      iosClientId: '11205182979-omk3gi4ub8vhlr78ho4svd51dc3l6m86.apps.googleusercontent.com',
      androidStandaloneAppClientId: '11205182979-6hb416dr84tqbcv0rl52vugrntuq9p02.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
  } catch(e) {
    result = {
      message: e.message,
      error: e,
    };
  }
  alert(JSON.stringify(result));
}

class App extends React.Component {
  async componentDidMount() {
    await signInWithGoogleAsync();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up main.js to start working on your app!</Text>
      </View>
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

Expo.registerRootComponent(App);
