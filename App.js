import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'; // ActivityIndicator shows loading icon
import * as Location from 'expo-location'; // location of emulator phone

import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';
import ReloadIcon from './components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails';

import { colors } from './utils/index';
import { WEATHER_API_KEY } from 'react-native-dotenv';

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState('metric');  // default as celsius

  useEffect(() => {
    load();
  }, [unitsSystem]);

  async function load() {
    setCurrentWeather(null);
    setErrorMessage(null);
    try {
      let { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        setErrorMessage('Access to Location is needed to run this app.');
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      // alert(`latitude: ${latitude}, longitude: ${longitude}`);

      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;

      const response = await fetch(weatherUrl);

      const result = await response.json();

      if (response.ok) {
        setCurrentWeather(result);
      } else {
        setErrorMessage(result.message);
      }

    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const tempUnit = unitsSystem === 'metric' ? 'C' : 'F';

  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" barStyle='dark-content' hidden={false} backgroundColor='lime' translucent={true} />
        <View style={styles.main}>
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather} tempUnit={tempUnit} />
        </View>
        <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem} tempUnit={tempUnit} />
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.text}>ERROR!</Text> */}
        <ReloadIcon load={load} />
        <Text style={{ textAlign: 'center', fontSize: 20 }}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color={colors.PRIMARY_COLOR} />
        <StatusBar style='auto' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center'
  }
});
