import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const SuggestionList = ({ suggestions }) => {
  return (
    <ScrollView style={styles.container}>
      {suggestions.map((suggestions) => (
        <View key={suggestions._id} style={styles.suggesCard}>
          <Text style={styles.suggesText}>{suggestions.playername}</Text>
          <Text style={styles.suggesText}>{suggestions.suggestion}</Text>

        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  suggesCard: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    alignItems: "center",
  },

  suggesText: {
    fontSize: 16,
    padding: 10,
    color: "#333",
  },
});

export default SuggestionList;
