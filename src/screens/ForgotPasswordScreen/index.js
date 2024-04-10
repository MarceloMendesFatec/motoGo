import React, { useState } from 'react';
import { Heading, NativeBaseProvider,Text } from "native-base";
import { VStack, Input, Button, Center } from "native-base";


const ForgotPasswordScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    
    const sendPasswordReset = () => {
        console.log('Sending password reset email to: ', email);
        if(email === ''){
            alert('Preencha o campo de email');
        }else if(!/\S+@\S+\.\S+/.test(email)){
            alert('Email inválido');
        };


    };

    return (
        <NativeBaseProvider>
            
            <VStack space={10} alignItems="center" p={5} mt={10}>
                <Heading size="xl" color="primary.500">Enviar link de redefinição </Heading>
                <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <Button onPress={sendPasswordReset} w={100}>
                    Enviar
                </Button>
            </VStack>
          
        </NativeBaseProvider>
    );
};

export default ForgotPasswordScreen;