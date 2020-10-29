import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';

import { colors } from '../utils/index';

const { PRIMARY_COLOR, SECONDARY_COLOR } = colors;

export default function WeatherInfo({ currentWeather }) {
  const { main: { temp } } = currentWeather; // 2 level deconstructions of openweather data
  const { weather: [details] } = currentWeather;
  const { name } = currentWeather;
  // const { icon } = details;
  const { icon, main, description } = details;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <View style={styles.weatherInfo}>
      <Text>Location: {name}</Text>
      <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
      <Text style={styles.textPrimary}>{temp}°</Text>
      <Text style={styles.weatherDesc}>{description}</Text>
      <Text style={styles.textSecondary}>{main}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  weatherInfo: {
    alignItems: 'center'
  },
  weatherIcon: {
    height: 100,
    width: 100
  },
  weatherDesc: {
    textTransform: 'capitalize'
  },
  textPrimary: {
    fontSize: 40,
    color: PRIMARY_COLOR
  },
  textSecondary: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    color: SECONDARY_COLOR
  }
})