import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocation } from '../contexts/LocationContext';
// Certifique-se de importar o hook corretamente

export default function LocalizationInput() {
  const { location } = useLocation(); // Usar o contexto de localização
  
  let locationText = 'Aguardando localização...';

  if (location) {
    locationText = location.city && location.country
      ? `${location.city}, ${location.country}`
      : `Lat: ${location.latitude.toFixed(2)}, Long: ${location.longitude.toFixed(2)}`;
  }

  return (
    <TouchableOpacity 
      onPress={() => {
        Alert.alert(`Lat: ${location?.latitude}, Long: ${location?.longitude}`);
      }} 
      style={styles.container}
    >
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
