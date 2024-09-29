import React, { useState, useEffect } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { Button } from "react-native-paper";

interface Coordinates {
  latitude: number;
  longitude: number;
}

const Recycle = () => {
  const [userLocation, setUserLocation] = useState<Coordinates>({
    latitude: 0,
    longitude: 0,
  });
  const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([]);

  useEffect(() => {
    async function setup() {
      const permission = await requestForegroundPermissionsAsync();

      if (permission.status === "granted") {
        const loc = await getCurrentPositionAsync();
        setUserLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
      }
    }

    setup();
  }, []);

  useEffect(() => {
    if (userLocation) {
      const { latitude, longitude } = userLocation;

      async function searchNearbyRecyclingCenters() {
        try {
          const response = await fetch("http://10.0.2.2:5000/recenters", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ latitude, longitude }),
          }).then((res) => res.json());

          console.log(response);

          setNearbyPlaces(response);

          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
          }
        } catch (error) {
          return [];
        }
      }

      searchNearbyRecyclingCenters();
    }
  }, [userLocation]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {nearbyPlaces.map((place) => (
          <Marker
            key={place.place_id}
            coordinate={{
              latitude: place.coordinate.latitude,
              longitude: place.coordinate.longitude,
            }}
            title={place.title}
          />
        ))}
        <Marker
          coordinate={userLocation}
          title="You Are Here!"
          pinColor="blue"
        />
      </MapView>
    </View>
  );
};

export default Recycle;
