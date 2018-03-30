import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import ListScreen from './ListScreen';
import MapScreen from './MapScreen';


export default TabNavigator({
  List: { screen: ListScreen },
  Map: { screen: MapScreen },
});