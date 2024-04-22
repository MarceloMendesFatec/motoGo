import React from "react";
import { NativeBaseProvider, Text } from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserScreen from "../screens/userScreen";
import EditUserScreen from "../screens/editUserScreen";



const Stack = createNativeStackNavigator();

const UserNavigation = ({ navigation }) => {
    return (
        <NativeBaseProvider>
           
                <Stack.Navigator>
                    <Stack.Screen
                        name="User"
                        component={UserScreen}
                        options={{ headerShown: false , }}
                    />
                    <Stack.Screen
                        name="EditUser"
                        component={EditUserScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            
        </NativeBaseProvider>
    );
}

export default UserNavigation;