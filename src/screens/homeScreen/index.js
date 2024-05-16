import React, { useEffect, useState } from "react";
import { NativeBaseProvider, Fab } from "native-base";
import Header from "../../components/header";
import AvailableMotocycle from "../../components/availableMotocycle";
import { BackHandler } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [refresh, setRefresh] = useState(false);

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
      <Header key={refresh} />
      <AvailableMotocycle />
      <Fab
        position="absolute"
        size="sm"
        icon={<FontAwesome5 name="plus" size={30} color="white" />}
        onPress={() => navigation.navigate("AddMotorcycle")}
      />
    </NativeBaseProvider>
  );
};

export default HomeScreen;
