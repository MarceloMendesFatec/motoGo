import React from "react";
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./src/routes/routes";

export default function App() {
  return (
    <NativeBaseProvider>
     
    <AppNavigator />
    </NativeBaseProvider>
  );
}

//raiz do projeto
//AppNavigator é o componente que contém a navegação