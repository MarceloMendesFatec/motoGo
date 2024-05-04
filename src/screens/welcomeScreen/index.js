import React, { useState } from 'react';
import { Text, NativeBaseProvider, Container, Image, Heading, Center } from 'native-base';

const WelcomeScreen = ({ navigation }) => {


    return (
        <NativeBaseProvider>
            <Center m={4}>
                
                    <Heading size="xl" mb={4} mt={100} textAlign="center" color="primary.500">Seja bem vindo ao  motoGo!</Heading>
                    <Image source={require('../../assets/Hello-amico.png')} alt="motoGoIcon" style={{ width: 150, height: 150 }} />
                    <Text fontSize="lg" textAlign="center" color="gray.500" mb={6}>
                        Por favor, complete as informações no formulário abaixo para garantir o seu primeiro acesso.
                    </Text>
               
            </Center>
        </NativeBaseProvider>
    );
};

export default WelcomeScreen;