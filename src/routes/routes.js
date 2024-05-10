import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import SplashScreen from "../screens/splashScreen";
import LoginScreen from "../screens/loginScreen";
import SignUpScreen from "../screens/signUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";


import { NativeBaseProvider } from "native-base";
import AppTabNavigator from "./routesTab";

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
            options={{ headerShown: false, title: "Cadastro de usuário", headerTintColor: "#06b6d4"}}
          />
         <Stack.Screen
            name="Forgot"
            component={ForgotPasswordScreen}
            options={{ headerShown: false, title: "Esqueci a senha", headerTintColor: "#06b6d4"}}
          />
         <Stack.Screen
            name="Home"
            component={AppTabNavigator}
            options={{ headerShown: false}}
          />
        
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default AppNavigator;
