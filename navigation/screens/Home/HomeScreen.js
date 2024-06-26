import { useState } from "react";
import { View, Text, TextInput, Button, Keyboard } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import api from "../../../api/api";

export default function HomeScreen({ navigation }) {
  const [type, setType] = useState("User");
  const [keyboard, setKeyboard] = useState("email-address");
  const [color, setColor] = useState("red");
  //const [option, setOption] = useState("User");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiname, setApiname] = useState("users");

  const optionsSelector = [
    { label: "User", activeColor: "red" },
    { label: "Admin", activeColor: "green" },
  ];

  return (
    <View style={{ flex: 0.9, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Bem vindo, digite seu email
      </Text>
      <SwitchSelector
        style={{ margin: 50 }}
        options={optionsSelector}
        initial={0}
        onPress={(value) => {
          setType(value);
          if (value == "RA") {
            setColor("red");
            setOption("User");
            setApiname("users");
          } else {
            setColor("green");
            setOption("Admin");
            setApiname("admins");
          }
        }}
      />

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType={keyboard}
        selectedColor={color}
        style={{
          height: 40,
          margin: 10,
          width: 200,
          borderWidth: 1,
          padding: 10,
        }}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        keyboardType={keyboard}
        selectedColor={color}
        style={{
          height: 40,
          margin: 10,
          width: 200,
          borderWidth: 1,
          padding: 10,
        }}
      />

      <Button
        title="Enter"
        color={color}
        onPress={() => {
          if (text == "") {
            alert("Texto vázio");
            return;
          }
          api
            .get(`/${apiname}/${email}`)
            .then((response) => {
              navigation.navigate({ name: "Main", params: { email: email } });
            })
            .catch((error) => {
              if (error.response || responseText == "") {
                alert(`Numero de ${type} Inválido`);
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              }
            });

          Keyboard.dismiss();
        }}
      />
    </View>
  );
}
