import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { ListItem } from "react-native-elements";

const _keyExtractor = item => item.id;

const JobIsTaken = () => (
    <Ionicons
      size={30}
      name="ios-checkmark-circle"
      color="green"
    />
  );

export default class ListScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          jobs: [],
        }
      }

    static navigationOptions = {
        tabBarLabel: "Liste",
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-list-outline" size={25} color={tintColor} />,
    };

    componentDidMount() {
        fetch('https://mobile-api-jobs.herokuapp.com/api/jobs')
        .then(data => data.json())
        .then(jobs => {
            this.setState({ jobs })
        })
        .catch(console.error)
    }

    render() {
        return (
        <View style={styles.container}>
            <FlatList
                style={styles.container}
                data={this.state.jobs}
                keyExtractor={_keyExtractor}
                // renderItem={({item}) => <Text key={item.id}>{item.name}</Text>}
                renderItem={({item}) =>
                    <ListItem
                    key={item.id}
                    title={item.name}
                    hideChevron
                    badge={item.status === "true" ? { element: <JobIsTaken /> } : { element: <View /> }}
                    />
                }
            />
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});