import React, { Component } from 'react';

import Fetch from '../components/Fetch.js'
import fetchMessages from '../utils/fetchMessages'
import MessageInformation from '../components/Components/MessageInformation'
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

   render() {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Fetch
              source={fetchMessages}
            >
              {props =>
                <MessageInformation {...props} />
              }
            </Fetch>
          </ScrollView>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
});
