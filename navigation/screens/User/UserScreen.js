import * as React from "react";
import { useState } from "react";
import { Text, TextInput, View, ScrollView, Button, Alert } from "react-native"; // Import Alert from React Native
import axios from "axios";

export default function UserScreen({ navigation, route }) {
	const [review, setReview] = useState("");

	const handleSubmitReview = async () => {
		try {
			const response = await axios.post(`http://10.0.2.2:2020/reviews`, {
				review,
			});

			// Display success popup when review is sent successfully
			Alert.alert(
				"Success", // Title
				"Review enviado com sucesso!", // Message
				[
					{ text: "OK" }, // Button
				]
			);
		} catch (error) {
			console.error(error.response.status);

			// Optionally, you can also display an error popup if the review sending fails
			Alert.alert("Error", "Failed to send the review. Please try again.", [
				{ text: "OK" },
			]);
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
						height: 60,
						margin: 10,
						width: 280,
						borderWidth: 1,
						padding: 10,
						fontSize: 18,
					}}
				/>
				<Button title="Enter" onPress={handleSubmitReview} />
			</View>
		</ScrollView>
	);
}
