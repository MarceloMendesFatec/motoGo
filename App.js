// App.js

import React from "react";
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./src/routes/routes";
import db from "./src/service/firebaseConfig";

// Desabilita os warnings amarelos
console.disableYellowBox = true;

export default function App() {
  console.log(db); // Testando a conexão com o banco de dados

  return (
    <NativeBaseProvider>
      <AppNavigator />
    </NativeBaseProvider>
  );
}
