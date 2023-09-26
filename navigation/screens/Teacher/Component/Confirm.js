import * as React from "react";
import { View, Text, Image, Button } from "react-native";
export default function Confirm() {
  const [username, setUsername] = React.useState("");

  return (
    <View>
      <Text>{username}</Text>
      <Button
        title="Confirmar"
        onPress={() => {
          setScanData(undefined);
          handleStudent(scanData);
          console.log(attendance);
        }}
      />{" "}
    </View>
  );
}
