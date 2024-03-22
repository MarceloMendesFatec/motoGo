import React, { useState } from 'react';
import { NativeBaseProvider, Box, Input, Button, ScrollView, Text, Heading, VStack,FormControl, Divider } from 'native-base';

const SignUpScreen = ({ navigation }) => {
    

    return (
        <NativeBaseProvider>
            <ScrollView mt={9}>
                <Heading size="lg" mb={4} textAlign="center" color="primary.500">Seja bem-vindo ao motoGo</Heading>
                <VStack space={2} mt={5} p={5}>
                    <FormControl isRequired>
                        <FormControl.Label>Nome</FormControl.Label>
                        <Input placeholder="Digite seu nome" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input placeholder="Digite seu email" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Senha</FormControl.Label>
                        <Input placeholder="Digite sua senha" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Confirme sua senha</FormControl.Label>
                        <Input placeholder="Confirme sua senha" />
                    </FormControl>
                    <Button onPress={{}} colorScheme="primary" mt={5}>Cadastrar</Button>
                    <Divider mt={5} />
                    <Text textAlign={"center"} color={'primary.600'}>Ou faça login com : </Text>
                </VStack>
            </ScrollView>
        </NativeBaseProvider>
    );
};

export default SignUpScreen;