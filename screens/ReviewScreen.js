import React, { Component } from 'react';
import { View, Text, ScrollView, Linking, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, Icon } from 'react-native-elements';
import { MapView } from 'expo';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Review Jobs',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="favorite" size={30} color={tintColor} />;
    },
    headerRight: (
      <Button
        title='Settings'
        onPress={() => navigation.navigate('settings')}
        backgroundColor='rgba(0,0,0,0)'
        color='rgba(0,122,255,1)'
      />
    )
  });

  renderSavedJobs() {
    if (this.props.savedJobs.length === 0) {
      return (
        <Card>
          <View>
            <Text>Head over to Map and Like some Jobs.</Text>
            <Text>They'll appear here with links to Apply!</Text>
          </View>
        </Card>
      );
    }
    
    return this.props.savedJobs.map(job => {
      const {
        jobkey, company,
        formattedRelativeTime, url,
        latitude, longitude, jobtitle,
        formattedLocationFull
      } = job;
      const initialRegion = {
        longitude,
        latitude,
        longitudeDelta: 0.02,
        latitudeDelta: 0.045
      };

      return (
        <Card
          key={jobkey}
          title={jobtitle}
          >
            <View style={{ height: 300 }}>
              <MapView
                style={{ flex: 1 }}
                cacheEnabled={Platform.OS === 'android'}
                scrollEnabled={false}
                initialRegion={initialRegion}
              >
                <MapView.Marker
                  coordinate={{longitude, latitude}}
                  title={company}
                  description={formattedLocationFull}
                />
              </MapView>
              <View style={styles.detailWrapper}>
                <Text style={styles.italics}>{company}</Text>
                <Text style={styles.italics}>{formattedRelativeTime}</Text>
              </View>
              <Button
                title="Apply Now!"
                backgroundColor='#03a9f4'
                onPress={() => Linking.openURL(url)}
              />
            </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderSavedJobs()}
      </ScrollView>
    );
  }
}

const styles = {
  detailWrapper: {
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  italics : {
    fontStyle: 'italic'
  }
}

const mapStateToProps = ({ savedJobs}) => {
  return { savedJobs }
};

export default connect(mapStateToProps)(ReviewScreen);
