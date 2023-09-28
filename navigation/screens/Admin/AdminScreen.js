import * as React from "react";
import { View, Text, Button } from "react-native";

export default function AdminScreen({ navigation, route }) {
	/*
  useEffect(() => {
    (async () => await handleTeacher())();
  }, [route.params?.text]);
*/
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text style={{ fontSize: 26, fontWeight: "bold" }}>Admin Screen</Text>
		</View>
	);
}
