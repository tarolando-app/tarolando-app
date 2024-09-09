import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

interface LocationProps {
  latitude: number;
  longitude: number;
  city?: string | null;
  country?: string | null;
}

export default function LocalizationInput() {
  const [location, setLocation] = useState<LocationProps | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let watchId: any;

    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada.');
        return;
      }

      watchId = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 30000, // Atualiza a cada 30 segundos
          distanceInterval: 2000, // Atualiza se o usuário se mover mais de 2000 metros (2km)
        },
        async (locationData) => {
          const { latitude, longitude } = locationData.coords;

          let [reverseGeocodeResult] = await Location.reverseGeocodeAsync({ latitude, longitude });
          const city = reverseGeocodeResult?.city;
          const country = reverseGeocodeResult?.country;

          setLocation({ latitude, longitude, city, country });
        }
      );
    };

    fetchLocation();

    return () => {
      if (watchId) {
        watchId.remove();
      }
    };
  }, []);

  let locationText = 'Aguardando localização...';
  if (errorMsg) {
    locationText = errorMsg;
  } else if (location) {
    locationText = location.city && location.country
      ? `${location.city}, ${location.country}`
      : `Lat: ${location.latitude.toFixed(2)}, Long: ${location.longitude.toFixed(2)}`;
  }

  return (
    <TouchableOpacity onPress={() => {
        Alert.alert(`Lat: ${location?.latitude}, Long: ${location?.longitude}`)
    }} style={styles.container}>
      <Text style={styles.textLocalization}>
        Sua localização{' '}
        <MaterialCommunityIcons
          name="arrow-down-drop-circle-outline"
          size={16}
          color={"#FFF"}
        />
      </Text>
      <Text style={styles.text}>{locationText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 8,
  },
  textLocalization: {
    color: '#FFF',
    opacity: 0.5,
    fontSize: 16,
    marginBottom: 2,
    fontFamily: 'PlusJakartaSans-400',
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-500',
  },
});
