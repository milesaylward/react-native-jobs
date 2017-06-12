import React, { Component } from 'react';
import { View, Text, AppLoading, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions/index';
import Slides  from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to Job Finder!\nSwipe right to continue.', color: '#009688' },
  { text: 'Sign In.\nChoose a location.\nEnter a job title.\nThen get to swiping!', color: '#03a9f4' },
  { text: 'Swipe right to like a job\nleft to dislike!', color: '#009688' },
  { text: 'View your saved jobs under the review tab!', color: '#03a9f4' },
];

class WelcomeScreen extends Component {
  async componentWillMount() {
    await this.props.checkForToken();

    if(this.props.token) {
      this.props.navigation.navigate('map');
    }
  }
  //es 2017 defining the callback as a fat arrow function allows us to avoid
  //calling bind this in our components
  onSlidesComplete = () => {
    //when rendering something using react-navigation as this component is in main.js
    //it is automatically given the prop of navigation with helper methods like the navigate function.
    this.props.navigation.navigate('auth');
  }

  render() {
    if (this.props.token === null) {
      return <AppLoading />;
    } else if (this.props.token === false) {
      return (
        <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete}/>
      );
    } else {
        return <View />
    }
  }
}

const mapStateToProps = ({ auth }) => {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(WelcomeScreen);
