import React from "react";
import { NativeBaseProvider, Text } from "native-base";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserScreen from "../screens/userScreen";
import RateScreen from "../screens/rateScreen";
import HomeScreen from "../screens/homeScreen";

const Tab = createBottomTabNavigator();

const AppTabNavigator = ({navigation}) => {
    return (
        <NativeBaseProvider>
            <Tab.Navigator>
                <Tab.Screen name="Inicio" component={HomeScreen} options={{ headerShown: false}}/>
                <Tab.Screen name="Usuario" component={UserScreen} options={{ headerShown: false}}/>
                <Tab.Screen name="Avaliar" component={RateScreen} options={{ headerShown: false}} />
            </Tab.Navigator>
        </NativeBaseProvider>
    );
};

export default AppTabNavigator;
