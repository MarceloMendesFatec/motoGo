import * as React from "react";
import { NativeBaseProvider, Text, Box, Heading, Button,Image } from "native-base";
import * as Animatable from 'react-native-animatable'; //transicao de animacao
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect } from "react";


const SplashScreen = ({ navigation }) => {//todas as telas recebem o parâmetro navigation
 
  useEffect(() => {//este hook se permite se conectar com o componente externamente
    setTimeout(() => {//funcao que redireciona para a tela de login apos certos segundos
      navigation.navigate('Login');
    }, 4000);
  }, []);  
  
  return (
      //todos os componentes do NativeBase são renderizados dentro desta tag
      <NativeBaseProvider>  
        <Box flex={1} bg="#f2f2f2" alignItems="center" justifyContent="center">
          <Animatable.View animation="fadeIn" duration={4000}>
            <Heading color="primary.500" size='3xl'> motoGo</Heading>
            <Box mt={4} justifyContent="center" alignItems="center" >
              <Image source={require('../../assets/logo-rafiki.png')} alt="motoGoIcon" style={{ width: 200, height: 200 }} />
            </Box>
          </Animatable.View>   
        </Box>
      </NativeBaseProvider>
    );
  }


export default SplashScreen;

//tela que renderiza a splash screen