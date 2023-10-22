import * as React from "react";
import { useState } from "react";
import { Text, TextInput, View, ScrollView, Button } from "react-native";
import axios from "axios";

export default function UserScreen({ navigation, route }) {
  const [review, setReview] = useState("");

  const handleSubmitReview = async () => {
    try {
      const response = await axios.post(`http://10.0.2.2:2020/reviews`, {
        review,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.status);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 26, fontWeight: "bold", textAlign: "center" }}>
          User Screen
        </Text>
        <Text style={{ fontSize: 15, paddingTop: 100, textAlign: "center" }}>
          Review
        </Text>
        <TextInput
          value={review}
          onChangeText={setReview}
          placeholder="Review"
          style={{
            height: 60, // Adjusted height
            margin: 10,
            width: 280, // Adjusted width
            borderWidth: 1,
            padding: 10,
            fontSize: 18, // Adjusted font size
          }}
        />
        <Button title="Enter" onPress={handleSubmitReview} />
      </View>
    </ScrollView>
  );
}
