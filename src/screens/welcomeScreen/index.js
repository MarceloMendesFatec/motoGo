import React, { useState } from 'react';
import { Text, NativeBaseProvider, Button, Container, Image, Heading, Center, Box, FormControl, Input, VStack, ScrollView } from 'native-base';

const WelcomeScreen = ({ navigation }) => {
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({})

    const validar = () => {
        const newErrors = {}; // Criar um novo objeto de erros

        // Validar telefone
        if (!formData.telefone) {
            newErrors.telefone = 'Telefone é obrigatório';
        }
        else if (!formData.telefone || !/^\(\d{2}\) \d{4,5}-\d{4}$/.test(formData.telefone)) {
            newErrors.telefone = 'Telefone inválido';
        }

        // Validar CEP
        if (!formData.cep) {
            newErrors.cep = 'CEP é obrigatório';
        } else if (!formData.cep || !/^\d{5}-\d{3}$/.test(formData.cep)) {
            newErrors.cep = 'CEP inválido';
        }

        // Validar CPF
        if (!formData.cpf) {
            newErrors.cpf = 'CPF é obrigatório';
        } else if (!formData.cpf || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf)) {
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
                            <Input
                                placeholder="Digite seu telefone"
                                keyboardType='numeric'
                                value={formData.telefone}
                                maxLength={15}
                                onChangeText={value => {
                                    let formattedValue = value.replace(/\D/g, '');
                                    formattedValue = formattedValue.replace(/^(\d{2})(\d)/g, '($1) $2');
                                    formattedValue = formattedValue.replace(/(\d)(\d{4})$/, '$1-$2');
                                    setFormData({ ...formData, telefone: formattedValue });
                                }}
                            />
                            {errors.telefone && <Text color="red.500">{errors.telefone}</Text>}
                        </FormControl>
                        <FormControl isRequired _text={{ bold: true }}>
                            <FormControl.Label>CEP</FormControl.Label>
                            <Input
                                placeholder="Confirme sua senha"
                                keyboardType='numeric'
                                value={formData.cep}
                                maxLength={9} // Define o comprimento máximo para o CEP
                                onChangeText={value => {
                                    let formattedValue = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
                                    formattedValue = formattedValue.replace(/^(\d{5})(\d)/, '$1-$2'); // Insere o traço no quinto caractere
                                    setFormData({ ...formData, cep: formattedValue }); // Atualiza o estado com o valor formatado
                                }}
                            />
                            {errors.cep && <Text color="red.500">{errors.cep}</Text>}
                        </FormControl>
                        <FormControl isRequired _text={{ bold: true }}>
                            <FormControl.Label>CPF</FormControl.Label>
                            <Input 
    placeholder="Digite seu CPF" 
    keyboardType='numeric' 
    value={formData.cpf} 
    maxLength={14} // Define o comprimento máximo para o CPF
    onChangeText={value => {
        let formattedValue = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        formattedValue = formattedValue.replace(/^(\d{3})(\d)/, '$1.$2'); // Insere o ponto após os primeiros 3 dígitos
        formattedValue = formattedValue.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3'); // Insere o segundo ponto após os próximos 3 dígitos
        formattedValue = formattedValue.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4'); // Insere o traço após os próximos 3 dígitos
        setFormData({ ...formData, cpf: formattedValue }); // Atualiza o estado com o valor formatado
    }} 
/>

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