import React, { useState } from 'react';
import { NativeBaseProvider, Box, Checkbox, Input, Button, ScrollView, Text, Heading, VStack, FormControl, Divider, Center } from 'native-base';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



const SignUpScreen = ({ navigation }) => {


    
   
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({})
    const [termsChecked, setTermsChecked] = useState(false);
    const auth = getAuth();



    const cadastrar = () => {
        console.log('Cadastrando');
        console.log(formData);
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                // Cadastro com sucesso
                const user = userCredential.user;
                console.log('Usuário cadastrado com sucesso');
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Erro ao cadastrar');
                console.log(errorCode);
                console.log(errorMessage);
                // ..
            });
    }

    const validar = () => {
        const newErrors = {}; // Criar um novo objeto de erros
    
        // Verificar cada campo e adicionar o erro correspondente ao novo objeto de erros
        if (!formData.name) {
            newErrors.name = 'Campo obrigatório';
        } else if (formData.name.length <= 3) {
            newErrors.name = 'Nome deve ter mais de 3 caracteres';
        }
        if (!formData.email) {
            newErrors.email = 'Campo obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }
        if (!formData.password) {
            newErrors.password = 'Campo obrigatório';
        } else if (formData.password.length < 8) {
            newErrors.password = 'A senha deve ter pelo menos 8 caracteres';
        }
        if (!formData.passwordCheck) {
            newErrors.passwordCheck = 'Campo obrigatório';
        }else if (formData.password !== formData.passwordCheck) {
            newErrors.passwordCheck = 'As senhas não conferem';
        }

        // Verificar se os termos de uso foram aceitos
        if (!termsChecked) {
            newErrors.terms = 'Você deve aceitar os termos de uso';
        }
    
        // Definir o estado de erros com o novo objeto de erros
        setErrors(newErrors);
        
        // Verificar se não há erros antes de cadastrar
        if (Object.keys(newErrors).length === 0) {
            cadastrar();
        }
    }
    
    

    return (
        <NativeBaseProvider>
            <Center>
                <ScrollView mt={9} >
                  <Heading size="xl" mb={4} mt={100} textAlign="center" color="primary.500">Seja bem-vindo ao motoGo</Heading>
                    <Box borderWidth={3} borderColor="gray.200" borderRadius={10} p={1}mt={50}>
                        <VStack space={2} mt={1} p={5}  >
                            <FormControl isRequired>
                                <FormControl.Label _text={{ bold: true }}>Nome</FormControl.Label>
                                <Input placeholder="Digite seu nome" onChangeText={value => setFormData({ ...formData, name: value })} />
                                {errors.name && <Text color="red.500">{errors.name}</Text>}
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label _text={{ bold: true }}>Email</FormControl.Label>
                                <Input placeholder="Digite seu email" onChangeText={value => setFormData({ ...formData, email: value })} />
                                {errors.email && <Text color="red.500">{errors.email}</Text>}
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label _text={{ bold: true }}>Senha</FormControl.Label>
                                <Input placeholder="Digite sua senha" type='password' onChangeText={value => setFormData({ ...formData, password: value })}/>
                                {errors.password && <Text color="red.500">{errors.password}</Text>}
                            </FormControl>
                            <FormControl isRequired _text={{ bold: true }}>
                                <FormControl.Label>Confirme sua senha</FormControl.Label>
                                <Input placeholder="Confirme sua senha" type='password' onChangeText={value => setFormData({ ...formData, passwordCheck: value })}/>
                                {errors.passwordCheck && <Text color="red.500">{errors.passwordCheck}</Text>}
                            </FormControl>
                            <FormControl isRequired _text={{ bold: true }}>
                                <FormControl.Label mt={2}>
                                    <Checkbox value={termsChecked} onChange={() => setTermsChecked(!termsChecked)}>
                                        Li e concordo com os <Text color="blue.500" textDecorationLine="underline">termos de uso</Text>
                                    </Checkbox>
                                </FormControl.Label>
                                {errors.terms && <Text color="red.500">{errors.terms}</Text>}
                            </FormControl>
                            
                            <Button onPress={validar} colorScheme="primary" mt={5}>Cadastrar</Button>
                        </VStack>
                    </Box>
                </ScrollView>
            </Center>
        </NativeBaseProvider>
    );
};

export default SignUpScreen;
