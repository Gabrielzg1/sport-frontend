import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const ReviewList = ({ reviews, onDelete }) => {
  return (
    <ScrollView style={styles.container}>
      {reviews.map((review) => (
        <View key={review._id} style={styles.reviewCard}>
          <Text style={styles.reviewText}>{review.review}</Text>
          <TouchableOpacity
            onPress={() => onDelete(review._id)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteText}>X</Text>
          </TouchableOpacity>
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
  reviewCard: {
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewText: {
    fontSize: 16,
    color: "#333",
    flex: 1, // faz o texto ocupar a maior parte do espaço
  },
  deleteButton: {
    padding: 10, // torna mais fácil tocar no "X"
  },
  deleteText: {
    fontSize: 20,
    color: "red",
  },
});

export default ReviewList;
