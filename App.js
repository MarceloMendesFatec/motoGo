console.disableYellowBox = true;
import React from "react";
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./src/routes/routes";
import db from "./src/service/firebaseConfig";


export default function App() {
 
  return (
    console.log(db), //testando a conexao com o banco de dados 
    <NativeBaseProvider>
     
    <AppNavigator />
   
    </NativeBaseProvider>
  );
}

//raiz do projeto
//AppNavigator é o componente que contém a navegação em STACK