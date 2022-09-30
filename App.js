import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import * as Location from "expo-location";
import React, { useState, useEffect } from "react";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [ok, setOk] = useState(true);
  const [district, setDistrict] = useState("로딩 중..");
  const [street, setStreet] = useState("로딩 중..");

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );

    const { district, street } = location[0];
    setDistrict(district);
    setStreet(street);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{district}</Text>
        <Text style={styles.dongName}>{street}</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27℃</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27℃</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27°</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27℃</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
  },
  dongName: {
    fontSize: 28,
    fontWeight: "300",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 168,
    fontWeight: "600",
  },
  desc: {
    marginTop: -30,
    fontSize: 48,
  },
});
