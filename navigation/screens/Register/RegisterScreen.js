import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import SwitchSelector from "react-native-switch-selector";
import api from "../../../api/api";
import axios from "axios";

export default function RegisterScreen({ navigation }) {
  const [type, setType] = useState("User");
  const [keyboard, setKeyboard] = useState("email-address");
  const [color, setColor] = useState("red");
  const [option, setOption] = useState("User");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [apiname, setApiname] = useState("users");

  const optionsSelector = [
    { label: "User", value: "User", activeColor: "red" },
    { label: "Admin", value: "Admin", activeColor: "green" },
  ];

  async function register() {
    console.log({ nome: name, sennha: password, email: email });
    try {
      const response = await axios.post(`http://10.0.2.2:2020/${apiname}`, {
        nome: name,
        sennha: password,
        email: email,
      });
      console.log(response.data);
      navigation.navigate({ name: option, params: { email: email } });
    } catch (error) {
      console.error(error.response.status);
    }
  }

  return (
    <View style={{ flex: 0.7, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Sign-in</Text>
      <SwitchSelector
        style={{ margin: 50 }}
        options={optionsSelector}
        initial={0}
        onPress={(value) => {
          setType(value);
          if (value == "User") {
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
        value={name}
        onChangeText={setName}
        placeholder="Nome"
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
        onChangeText={setpassword}
        placeholder="Senha"
        keyboardType={keyboard}
        selectedColor={color}
        secureTextEntry={true}
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
          // Verificando se algum campo está vazio
          if (!password || !email || !name) {
            alert("Por favor, preencha todos os campos.");
            return;
          }
          register();
        }}
      />

      <TouchableOpacity onPress={() => navigation.navigate({ name: "Home" })}>
        <Text style={{ marginTop: 20, color: "red" }}>Já tem conta? login</Text>
      </TouchableOpacity>
    </View>
  );
}
