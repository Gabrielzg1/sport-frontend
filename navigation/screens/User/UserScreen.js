import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text, Image, Button } from "react-native";
import api from "../../../api/api";

export default function UserScreen({ navigation, route }) {
	/*const [username, setUsername] = useState("");
  const [qrcode, setQrcode] = useState(
    "https://i.pinimg.com/564x/67/d8/37/67d8379604084dd7d7c7fa8d41f4c739.jpg"
  );

  const handleStudents = async () => {
    try {
      const response = await api.get(
        `/students/${parseInt(route.params?.text)}`
      );
      console.log(typeof parseInt(route.params?.text));
      setQrcode(response.data.img);
      setUsername(response.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => await handleStudents())();
  }, [route.params?.text]);
*/
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text style={{ margin: 1 }}>User Screen</Text>
		</View>
	);
}
