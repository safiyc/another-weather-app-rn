import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location'; // location of emulator phone

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    load()
  }, []);

  async function load() {
    try {
      let { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        setErrorMessage('Access to Location is needed to run this app.');
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;
      alert(`latitude: ${latitude}, longitude: ${longitude}`);
    } catch (error) {

    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>React Native Weather App</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lime',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 30,
    backgroundColor: 'black',
    padding: 25
  }
});
