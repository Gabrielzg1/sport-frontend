import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

// Screens
import HomeScreen from "./screens/Home/HomeScreen";
import StudentScreen from "./screens/Student/StudentScreen";
import TeacherScreen from "./screens/Teacher/TeacherScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AttendanceScreen from "./screens/Teacher/AttendanceScreen";
import FinishScreen from "./screens/Teacher/FinishScreen";

//Screen names
const homeName = "Home";
const studentName = "Student";
const teacherName = "Teacher";
const attendanceName = "Attendance";
const finishName = "Finish";

const Stack = createNativeStackNavigator();

function MainContainer() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name={homeName} component={HomeScreen} />
				<Stack.Screen name={studentName} component={StudentScreen} />
				<Stack.Screen name={teacherName} component={TeacherScreen} />
				<Stack.Screen name={attendanceName} component={AttendanceScreen} />
				<Stack.Screen name={finishName} component={FinishScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default MainContainer;
