import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const ReviewList = ({ reviews }) => {
  return (
    <ScrollView style={styles.container}>
      {reviews.map((review) => (
        <View key={review._id} style={styles.reviewCard}>
          <Text style={styles.reviewText}>{review.review}</Text>
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
  },
  reviewText: {
    fontSize: 16,
    color: "#333",
  },
});

export default ReviewList;
