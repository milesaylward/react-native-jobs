import Expo, { Notifications } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Platform, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import registerNotifications from './services/pushNotifications';
import store from './store';
import WelcomeScreen from './screens/WelcomeScreen'
import AuthScreen from './screens/AuthScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen'


class App extends React.Component {

  componentDidMount() {
    registerNotifications();
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;

      if (origin ==='received' && text) {
        Alert.alert(
          'New notification',
          text,
          [{ text: 'Ok'}]
        );
      }
    });
  }

  render() {

    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            })
          }
        }, {
          swipeEnabled: false,
          tabBarPosition: 'bottom',
          tabBarOptions: {
            labelStyle: { fontSize: 12 },
            showIcon: true,
            iconStyle: { width: 30 },
          }
        })
      }
    },{
      navigationOptions: {
        tabBarVisible: false
      },
      swipeEnabled: false,
      lazy: true,
    }
  );

    return (
    <Provider store={store}>
      <View style={styles.containerStyle}>
        <MainNavigator />
      </View>
    </Provider>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 24 : 0
  }
}

Expo.registerRootComponent(App);
