import React, { useState } from 'react';
import { Text, NativeBaseProvider,Button, Container, Image, Heading, Center, Box, FormControl, Input, VStack, ScrollView } from 'native-base';

const WelcomeScreen = ({ navigation }) => {
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({})

    const validar = () => {
        const newErrors = {}; // Criar um novo objeto de erros

        // Validar telefone
        if(!formData.telefone){
            newErrors.telefone = 'Telefone é obrigatório';
        }
        else if (!formData.telefone || !/^\d{11}$/.test(formData.telefone)) {
            newErrors.telefone = 'Telefone inválido';
        }

        // Validar CEP
       if(!formData.cep){
            newErrors.cep = 'CEP é obrigatório';
        }else if (!formData.cep || !/^\d{8}$/.test(formData.cep)) {
            newErrors.cep = 'CEP inválido';
        }

        // Validar CPF
        if(!formData.cpf){
            newErrors.cpf = 'CPF é obrigatório';
        }else  if (!formData.cpf || !/^\d{11}$/.test(formData.cpf)) {
            newErrors.cpf = 'CPF inválido';
        }

        // Definir o estado de erros com o novo objeto de erros
        setErrors(newErrors);

        // Verificar se não há erros antes de cadastrar
        if (Object.keys(newErrors).length === 0) {
           console.log('validacao dos inputs ok');
            // cadastrar();
        }
    }



    return (
        <NativeBaseProvider>
           <ScrollView >
            <Center m={4}>
                <Heading size="xl" mb={4} mt={100} textAlign="center" color="primary.500">Seja bem vindo ao  motoGo!</Heading>
                <Image source={require('../../assets/Hello-amico.png')} alt="motoGoIcon" style={{ width: 150, height: 150 }} />
                <Text fontSize="lg" textAlign="center" color="gray.500" mb={6}>
                    Por favor, complete as informações no formulário abaixo para garantir o seu primeiro acesso.
                </Text>

            </Center>
            <Box borderWidth={3} borderColor="gray.200" borderRadius={10} p={1} mx={3} mt={1}>
                <VStack space={2} p={5}  >
                    <FormControl isRequired>
                        <FormControl.Label _text={{ bold: true }}>Telefone</FormControl.Label>
                        <Input placeholder="Digite seu telefone" keyboardType='numeric' onChangeText={value => setFormData({ ...formData, telefone: value })} />
                        {errors.telefone && <Text color="red.500">{errors.telefone}</Text>}
                    </FormControl>
                    <FormControl isRequired _text={{ bold: true }}>
                        <FormControl.Label>CEP</FormControl.Label>
                        <Input placeholder="Confirme sua senha" keyboardType='numeric' onChangeText={value => setFormData({ ...formData, cep: value })} />
                        {errors.cep && <Text color="red.500">{errors.cep}</Text>}
                    </FormControl>
                    <FormControl isRequired _text={{ bold: true }}>
                        <FormControl.Label>CPF</FormControl.Label>
                        <Input placeholder="Confirme sua senha" keyboardType='numeric' onChangeText={value => setFormData({ ...formData, cpf: value })} />
                        {errors.cpf && <Text color="red.500">{errors.cpf}</Text>}
                    </FormControl>
                    <Button onPress={validar} backgroundColor={"#06B6D4"} mt={4}>
                        Enviar
                    </Button>
                </VStack>
            </Box>
            </ScrollView>
        </NativeBaseProvider>
    );
};

export default WelcomeScreen;