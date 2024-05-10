import { React, useEffect } from "react";
import { NativeBaseProvider, Text } from "native-base";
import Header from "../../components/header";
import { BackHandler } from "react-native";

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const backAction = () => {
        // Impedir o usuário de voltar para a tela de login
        return true;
    };

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    return () => backHandler.remove();
}, []);


  return (
    <NativeBaseProvider>
      <Header />
    </NativeBaseProvider>
  );
};

export default HomeScreen;