// routes.js

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import SplashScreen from "../screens/splashScreen";
import LoginScreen from "../screens/loginScreen";
import SignUpScreen from "../screens/signUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import HomeScreen from "../screens/homeScreen";
import { NativeBaseProvider } from "native-base";

const Stack = createNativeStackNavigator();

const AppNavigator = ({navigation}) => {
  return (
    <NativeBaseProvider>
      {/*  NavigationContainer é o componente que envolve toda a navegação */}
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
            options={{ headerShown: true, title: "Cadastro de usuário", headerTintColor: "#06b6d4"}}
          />
         <Stack.Screen
            name="Forgot"
            component={ForgotPasswordScreen}
            options={{ headerShown: true, title: "Esqueci a senha", headerTintColor: "#06b6d4"}}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default AppNavigator;
