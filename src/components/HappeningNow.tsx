import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import CardEvent from './CardEvent';

export default function HappeningNow({ tab }: any) {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.text}>Rolando agora</Text>
        <TouchableOpacity>
          <Text style={styles.textSeeMore}>Ver mais</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        <View style={{ flexDirection: 'row', gap: 24, marginHorizontal: 16 }}>
          <CardEvent></CardEvent>
          <CardEvent></CardEvent>
          <CardEvent></CardEvent>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginHorizontal: 16,
  },
  text: {
    color: '#FFF',
    fontSize: 20,
  },
  textSeeMore: {
    fontSize: 18,
    color: '#99DCFF',
  },
});
