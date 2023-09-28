import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

// Screens
import HomeScreen from "./screens/Home/HomeScreen";
import UserScreen from "./screens/User/UserScreen";
import AdminScreen from "./screens/Admin/AdminScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screen names
const homeName = "Home";
const userName = "User";
const adminName = "Admin";

const Stack = createNativeStackNavigator();

function MainContainer() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name={homeName} component={HomeScreen} />
				<Stack.Screen name={userName} component={UserScreen} />
				<Stack.Screen name={adminName} component={AdminScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default MainContainer;
