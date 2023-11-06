import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableNativeFeedback,
  TextInput, // importação adicional para o campo de texto
} from "react-native";

const PlayerList = ({ players }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null); // novo estado para o termo de pesquisa
  const [filteredPlayers, setFilteredPlayers] = useState(players); // novo estado para os jogadores filtrados

  const handlePlayerPress = (player) => {
    setSelectedPlayer(player);
    setModalVisible(true);
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text) {
      const newData = players.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredPlayers(newData);
    } else {
      setFilteredPlayers(players);
    }
  };

  const Touchable =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

  const renderItem = ({ item }) => (
    <Touchable onPress={() => handlePlayerPress(item)}>
      <View style={styles.listItem}>
        <Text style={styles.playerName}>{item.name}</Text>
      </View>
    </Touchable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TextInput
        style={styles.searchBar}
        value={searchTerm}
        placeholder="Search Players"
        onChangeText={(text) => handleSearch(text)}
      />
      <FlatList
        data={filteredPlayers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.modalCloseText}>×</Text>
            </TouchableOpacity>
            <View style={styles.modalContent}>
              <Text style={styles.modalName}>{selectedPlayer?.name}</Text>
              <Text style={styles.modalInfo}>
                Goals: {selectedPlayer?.goals}
              </Text>
              <Text style={styles.modalInfo}>
                Assists: {selectedPlayer?.assists}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... seus estilos existentes
  searchBar: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 10,
    borderColor: "#009688",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listItem: {
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  playerName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: "#e1e1e1",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalView: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalCloseButton: {
    alignSelf: "flex-end",
    padding: 8,
    borderRadius: 15,
    backgroundColor: "#e0e0e0",
  },
  modalCloseText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  modalContent: {
    alignItems: "center",
  },
  modalName: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  modalInfo: {
    fontSize: 16,
    marginTop: 5,
    color: "#555",
  },
  modalCloseButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  modalCloseText: {
    fontSize: 24,
    color: "#333",
  },
  modalName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInfo: {
    fontSize: 18,
    marginVertical: 2,
  },
});

export default PlayerList;
