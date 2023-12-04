import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const Head2Head = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  useEffect(() => {
    axios.get('http://10.0.2.2:2020/players')
      .then(response => {
        setPlayers(response.data);
      })
      .catch(error => {
        Alert.alert("Error", "Could not fetch players.");
      });
  }, []);

  const togglePlayerSelection = (player) => {
    if (isPlayerSelected(player.id)) {
      // Remove the player if already selected
      setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
    } else if (selectedPlayers.length < 2) {
      // Add the player if not already selected and less than 2 players are selected
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const isPlayerSelected = (playerId) => {
    return selectedPlayers.some(p => p.id === playerId);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.item, isPlayerSelected(item.id) ? styles.selectedItem : null]}
            onPress={() => togglePlayerSelection(item)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      {selectedPlayers.length === 2 && (
        <View style={styles.comparisonContainer}>
          {selectedPlayers.map((player, index) => (
            <View key={player.id} style={styles.playerContainer}>
              <Text style={styles.playerName}>{player.name}</Text>
              <Text>Gols: {player.goals}</Text>
              <Text>Assistências: {player.assists}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  selectedItem: {
    backgroundColor: '#DDF',
  },
  comparisonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10, // Reduzido de 20 para 10
  },
  playerContainer: {
    alignItems: 'center',
  },
  playerName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Head2Head;
