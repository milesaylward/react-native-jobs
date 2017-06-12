import React, { Component } from 'react';
import { View, Text, Platform, ToastAndroid } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { clearLikedJobs } from '../actions';

class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Settings',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="favorite" size={30} color={tintColor} />;
    }
  });

  render() {
    return (
      <View style={{marginTop: 30}}>
        <Button
          title="Reset Liked Jobs"
          large
          icon={{ name: 'delete-forever' }}
          backgroundColor='#f44336'
          onPress={() => this.props.clearLikedJobs(() => {
            if(Platform.OS === 'android' ) {
              ToastAndroid.showWithGravity(
                'Saved Jobs Cleared',
                ToastAndroid.SHORT, ToastAndroid.BOTTOM
              );
            }
          })}
        />
      </View>
    );
  }
}

export default connect(null, { clearLikedJobs })(SettingsScreen);
