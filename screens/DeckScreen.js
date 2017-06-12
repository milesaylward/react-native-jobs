import React, { Component } from 'react';
import { View, Text, Platform, ToastAndroid} from 'react-native';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';
import Swipe from '../components/Swipe';

class DeckScreen extends Component {
  static navigationOptions = {
      title: "Jobs",
      tabBarIcon: ({ tintColor }) => {
        return <Icon name="description" size={30} color={tintColor} />;
      }
  }
  renderCard(job) {
    const {
      jobtitle,
      company,
      formattedRelativeTime,
      snippet,
      longitude,
      latitude,
      formattedLocation
    } = job;

    const initialRegion = {
      longitude,
      latitude,
      longitudeDelta: 0.02,
      latitudeDelta: 0.045
    }

    return (
      <Card title={jobtitle}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            //android fix for map views not working with card roatation
            cacheEnabled={Platform.OS === 'android'}
            initialRegion={initialRegion}
            >
              <MapView.Marker
                coordinate={{latitude, longitude}}
                title={company}
                description={formattedLocation}
              />
            </MapView>
          </View>
        <View style={styles.detailWrapper}>
          <Text>{company}</Text>
          <Text>{formattedRelativeTime}</Text>
        </View>
        <Text>
          {snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
        </Text>
      </Card>
    )
  }

  renderNoMoreCards = () => {
    return (
      <Card title="No More Jobs">
        <Button
          title='Try a new search'
          large
          icon={{ name: 'my-location' }}
          backgroundColor='#03a9f4'
          onPress={() => this.props.navigation.navigate('map')}
        />
      </Card>
    );
  }

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          keyProp="jobkey"
          onSwipeRight={job => this.props.saveJob(job, () => {
            if(Platform.OS === 'android' ) {
              ToastAndroid.showWithGravity(
                'Job Saved',
                ToastAndroid.SHORT, ToastAndroid.BOTTOM
              );
            } else {
              return;
            }
          })}
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
};

const mapStateToProps = ({ jobs }) => {
  const { results } = jobs;
  return { jobs: results }
}

export default connect(mapStateToProps, actions)(DeckScreen);
