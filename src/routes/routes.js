// routes.js

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import SplashScreen from "../screens/splashScreen";
import LoginScreen from "../screens/loginScreen";
import SignUpScreen from "../screens/signUpScreen";
import { NativeBaseProvider } from "native-base";

const Stack = createNativeStackNavigator();

const AppNavigator = ({navigation}) => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: true, title: "Cadastro"}}
            
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default AppNavigator;
