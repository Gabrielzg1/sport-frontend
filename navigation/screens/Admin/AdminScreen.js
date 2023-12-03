import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import ReviewList from "./ReviewList";
import SuggestionList from "./SuggestionList";


export default function AdminScreen({ navigation, route }) {
  const [reviews, setReviews] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [extraloading, setExtraloading] = useState(true);

  const [error, setError] = useState("");
  const [visible, setVisible] = useState(null);

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


  const loadSuggestions = async () => {
    try {
      const response1 = await axios.get(`http://10.0.2.2:2020/suggestions`);
      setSuggestions(response1.data);
    } catch (error) {
      console.error(error);
      setError("Não foi possível carregar as Sugestões.");
    } finally {
      setExtraloading(false);
    }
  };

  useEffect(() => {
    loadData();
    loadSuggestions;
  }, []);

  return (
    <View style={styles.container}>
      
    <Button
      title="Ver Sugestões"
      onPress={setVisible(true)}
      style={styles.buttonadmin}

    />

    <Button
      title="Ver Reviews"
      onPress={setVisible(false)}
      style={styles.buttonadmin}

    />
      {visible ? (
          <View>
            <Text style={styles.title}>Sugestão dos Usuários</Text>
            {extraloading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <SuggestionList suggestions={suggestions} />
            )}
          </View>
        ) : (
        <View>
            <Text style={styles.title}>Review dos Usuários</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <ReviewList reviews={reviews} />
            )}

          </View>
      )
        
      }
      
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

  buttonadmin:{

    borderRadius: 5,
    fontSize:24,
    marginHorizontal:12,
    marginVertical:10,
    padding:10,

  },
});
