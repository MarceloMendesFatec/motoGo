import { React, useEffect } from "react";
import { NativeBaseProvider, Text, Fab, Icon, ScrollView, Container } from "native-base";
import Header from "../../components/header";
import AvailableMotocycle from "../../components/availableMotocycle";
import { BackHandler } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

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
      <Header/>
      <AvailableMotocycle/>
      <Fab
        position="absolute"
        size="sm"
        icon={<FontAwesome5 name="plus" size={30} color="white" />}
        onPress={() => navigation.navigate("MotorcycleDetails")}
      />
    </NativeBaseProvider>
  );
};

export default HomeScreen;