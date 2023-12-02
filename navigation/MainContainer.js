import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

// Screens
import HomeScreen from "./screens/Home/HomeScreen";
import UserScreen from "./screens/User/UserScreen";
import AdminScreen from "./screens/Admin/AdminScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";
import Head2HeadScreen from "./screens/User/Head2HeadScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screen names
const homeName = "Login";
const userName = "User";
const adminName = "Admin";
const registerName = "Register";
const Head2HeadName = "Head2Head";

const Stack = createNativeStackNavigator();

function MainContainer() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name={homeName} component={HomeScreen} />
				<Stack.Screen name={userName} component={UserScreen} />
				<Stack.Screen name={adminName} component={AdminScreen} />
				<Stack.Screen name={registerName} component={RegisterScreen} />
				<Stack.Screen name={Head2HeadName} component={Head2HeadScreen} />

			</Stack.Navigator>
		</NavigationContainer>
	);
}


export default MainContainer;
