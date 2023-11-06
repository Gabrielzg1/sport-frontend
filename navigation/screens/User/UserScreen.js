import * as React from "react";
import { useState, useEffect } from "react";
import { Text, TextInput, View, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import PlayerList from "./PlayerList";

export default function UserScreen({ navigation, route }) {
  const [review, setReview] = useState("");
  const [players, setPlayers] = useState([]);

  const handleSubmitReview = async () => {
    try {
      const response = await axios.post(`http://10.0.2.2:2020/reviews`, {
        review,
      });
      Alert.alert(
        "Review Submitted",
        "Your review has been submitted successfully!"
      );
      setReview("");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "There was an error submitting your review.");
    }
  };

  const loadData = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:2020/players`);
      setPlayers(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Could not load players data.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Players</Text>
      <PlayerList players={players} />
      <Text style={styles.reviewLabel}>Review</Text>
      <TextInput
        value={review}
        onChangeText={setReview}
        placeholder="Write your review here"
        style={styles.input}
        multiline
      />
      <Button
        title="Submit Review"
        onPress={handleSubmitReview}
        color="#1E90FF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  reviewLabel: {
    fontSize: 18,
    paddingTop: 20,
    alignSelf: "flex-start",
  },
  input: {
    height: 100,
    marginVertical: 10,
    width: "90%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});
