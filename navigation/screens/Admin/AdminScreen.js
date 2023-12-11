import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";
import ReviewList from "./ReviewList";
import SuggestionList from "./SuggestionList";

export default function AdminScreen() {
  const [reviews, setReviews] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadingSuggestions, setLoadingSuggestions] = useState(true);

  const [errorReviews, setErrorReviews] = useState("");
  const [errorSuggestions, setErrorSuggestions] = useState("");
  const [visible, setVisible] = useState(null); // null initially, true for suggestions, false for reviews

  const loadData = async () => {
    try {
      const response = await axios.get("http://10.0.2.2:2020/reviews");
      setReviews(response.data);
      setLoadingReviews(false);
    } catch (error) {
      console.error(error);
      setErrorReviews("Não foi possível carregar as reviews.");
    }

    try {
      const response1 = await axios.get("http://10.0.2.2:2020/suggestions");
      setSuggestions(response1.data);
      setLoadingSuggestions(false);
    } catch (error) {
      console.error(error);
      setErrorSuggestions("Não foi possível carregar as sugestões.");
    }
  };

  // Dentro do componente AdminScreen

  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://10.0.2.2:2020/reviews/${reviewId}`);
      // Removendo a review deletada da lista
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error(error);
      // Tratar o erro conforme necessário
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Ver Sugestões"
        onPress={() => setVisible(true)}
        style={[styles.buttonadmin, styles.firstButton]}
      />
      <Button
        title="Ver Reviews"
        onPress={() => setVisible(false)}
        style={[styles.buttonadmin, styles.secondButton]}
      />

      {visible === true ? (
        loadingSuggestions ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : errorSuggestions ? (
          <Text style={styles.errorText}>{errorSuggestions}</Text>
        ) : (
          <SuggestionList suggestions={suggestions} />
        )
      ) : visible === false ? (
        loadingReviews ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : errorReviews ? (
          <Text style={styles.errorText}>{errorReviews}</Text>
        ) : (
          <ReviewList reviews={reviews} onDelete={deleteReview} />
        )
      ) : (
        <Text style={styles.title}>Selecione uma opção</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
  buttonadmin: {
    borderRadius: 5,
    fontSize: 24,
    marginHorizontal: 12,
    padding: 10,
  },
  firstButton: {
    marginBottom: 20, // Aumenta a margem inferior do primeiro botão
  },
  secondButton: {
    marginTop: 20, // Aumenta a margem superior do segundo botão
  },
});
