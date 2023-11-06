import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import ReviewList from "./ReviewList";

export default function AdminScreen({ navigation, route }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:2020/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error(error);
      setError("Não foi possível carregar as reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviews dos Usuários</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ReviewList reviews={reviews} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start", // Changed to flex-start to align items at the top
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20, // Added margin at the bottom
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});
