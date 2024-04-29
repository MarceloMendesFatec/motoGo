import React from "react";
import { NativeBaseProvider, Text } from "native-base";
import Header from "../../components/header";
import { useEffect,  } from "react";
import { BackHandler } from "react-native";



const HomeScreen = ({ navigation }) => {
    useEffect(() => {
        const backAction = () => {
          // Intercepta o evento de pressionar o botão de voltar
          // Neste caso, não faz nada, bloqueando o comportamento padrão
          return true; // Retorna true para indicar que o evento foi manipulado
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove(); // Remove o ouvinte quando a tela for desmontada
      }, []);
    
    return (
        <NativeBaseProvider>
         <Header/>
           
        </NativeBaseProvider>
    );
};

export default HomeScreen;
