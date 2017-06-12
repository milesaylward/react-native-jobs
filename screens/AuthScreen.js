import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions';

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
      this.onAuthComplete(nextProps);
    }

  onAuthComplete(props) {
    console.log(props);
    if(props.token){
      this.props.navigation.navigate('map');
    } else {
      this.props.navigation.navigate('map');
    }
  }
  render() {
    return (
      <View>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { token: auth.token };
};

export default connect(mapStateToProps, actions)(AuthScreen);
