import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import api from "../../../api/api";

export default function FinishScreen({ navigation, route }) {
  const handleAttendance = async () => {
    try {
      api
        .post(`/presence`, {
          id: route.params?.subjectName,
        })

        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAttendance = async () => {
    try {
      api
        .delete(`/presence/${route.params?.subjectName}`)
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinish = async () => {
    console.log(route.params.attendance[0]);
    for (i = 0; i < route.params?.attendance.length; i++) {
      try {
        api
          .put(
            `/presence/${route.params?.subjectName}?newRa=${route.params.attendance[i]}`
          )
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      handleAttendance();
    })();
  }, [route.params?.attendance, route.params?.subjectName]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 26, fontWeight: "bold", margin: 10 }}>
        Lista de Presentes
      </Text>
      <FlatList
        data={route.params?.attendance}
        renderItem={({ item }) => (
          <View style={styles.containerStudents}>
            <Text style={styles.text}>{item}</Text>
          </View>
        )}
      ></FlatList>
      <Button
        onPress={() => {
          handleFinish();
        }}
        title="Send"
      />

      <Button
        onPress={() => {
          handleDeleteAttendance();
          navigation.navigate("Home");
        }}
        title="Back"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignContent: "center",
    justifyContent: "center",
  },
  containerStudents: {
    backgroundColor: "green",
    height: 30,
    width: 400,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
});
