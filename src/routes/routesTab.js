import React from "react";
import { NativeBaseProvider, Text } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import HistoricalScreen from "../screens/historicalScreen";
import HomeScreen from "../screens/homeScreen";
import RoutesUSer from "./routesUser";

const Tab = createBottomTabNavigator();

const AppTabNavigator = ({ navigation }) => {
    return (
        <NativeBaseProvider>
            <Tab.Navigator>
                <Tab.Screen
                    name="Inicio"
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => {
                            return <MaterialIcons name={focused ? "home" : "home"} size={44} color={focused ? "#06b6d4" : "gray"} />;
                        },
                        tabBarShowLabel: false,
                        gestureEnabled: false
                    }}
                />

                <Tab.Screen
                    name="Historico"
                    component={HistoricalScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({focused}) => {
                            return <MaterialIcons name={focused? "list" : "list"} size={44} color={focused ? "#06b6d4" : "gray"} />;
                        },
                        tabBarShowLabel: false,
                    }}
                />
                <Tab.Screen
                    name="Usuario"
                    component={RoutesUSer}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({focused}) => {
                            return <MaterialIcons name={focused? "person" : "person"} size={44} color={focused ? "#06b6d4" : "gray"} />;
                        },
                        tabBarShowLabel: false,
                    }}
                />
            </Tab.Navigator>
        </NativeBaseProvider>
    );
};

export default AppTabNavigator;
