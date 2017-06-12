import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TextInput } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { MapView } from 'expo';
import { connect } from 'react-redux';

import Input from '../components/Input';
import * as actions from '../actions';

class MapScreen extends Component {
  static navigationOptions = {
      title: "Map",
      tabBarIcon: ({ tintColor }) => {
        return <Icon name="my-location" size={30} color={tintColor} />;
      }
  }
  state = {
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    },
    mapLoaded: false
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  onButtonPress = () => {
    this.props.fetchJobs(this.state.region, this.props.query, () => {
      this.props.navigation.navigate('deck');
    });
  }


  render() {
    if(!this.state.mapLoaded) {
      return (
        <View>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    return (
      <View style={{ flex: 1 }}>
        <MapView
          region={this.state.region}
          style={{ flex: 1 }}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style={styles.contentContainer}>
          <View style={styles.searchContainer}>
            <Input
              placeholder= "Search Jobs"
              onChangeText={value => this.props.searchQueryChange(value)}
              value={this.props.query}
            />
            <Button
              icon={{ name: 'search', size: 30, style: { marginRight: 0 } }}
              buttonStyle={styles.buttonStyle}
              onPress={this.onButtonPress}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  contentContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10
  },
  searchContainer: {
    flexDirection: 'row'
  },
  buttonStyle: {
    flex: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5
  }
}

const mapStateToProps = state => {
  const { query } = state.jobs;
  return { query };
}

export default connect(mapStateToProps, actions)(MapScreen);
