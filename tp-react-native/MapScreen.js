import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

export default class MapScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            latitude: 37.78825,
            longitude: -122.4324 
        }
    }

    static navigationOptions = {
        tabBarLabel: "Map",
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-map-outline" size={25} color={tintColor} />,
    };

    componentDidMount() {
        fetch('https://mobile-api-jobs.herokuapp.com/api/jobs')
        .then(data => data.json())
        .then(jobs => {
            this.setState({ jobs })
        })
        .catch(console.error)

        navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            (error) => console.error(error.message),
          );
    }

  render() {
    return (
        <MapView
            style={{ flex: 1 }}
            region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 100,
                longitudeDelta: 100,
              }}
            /*initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 100,
            longitudeDelta: 100,
            }}*/
        >
            {this.state.jobs.map(job => (
            <MapView.Marker
                key={job.id}
                coordinate={{
                    latitude: parseInt(job.latitude),
                    longitude: parseInt(job.longitude),
                }}
                pinColor={job.status === "true" ? 'green' : 'red'}
                title={job.name}
            />
            ))}
        </MapView>
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