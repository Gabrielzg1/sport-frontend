import * as React from "react";
import { View, Text, Button } from "react-native";
import { useState, useEffect } from "react";
import api from "../../../api/api";

export default function TeacherScreen({ navigation, route }) {
  const [username, setUsername] = useState("");
  const [classroom, setClassroom] = useState();
  const handleTeacher = async () => {
    try {
      const response = await api.get(`/teachers/${route.params?.text}`);
      setUsername(response.data.name);
      setClassroom(response.data.subject);
      console.log(response.data.subject);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => await handleTeacher())();
  }, [route.params?.text]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>Olá, {username} </Text>
      <Button
        title="Iniciar Chamada"
        onPress={() =>
          navigation.navigate("Attendance", { classroom: classroom })
        }
      />
    </View>
  );
}
