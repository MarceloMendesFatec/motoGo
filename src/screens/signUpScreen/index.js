import React, { useState } from 'react';
import { NativeBaseProvider, Box, Input, Button, ScrollView, Text, Heading } from 'native-base';

const SignUpScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');
    const [isNomeValid, setIsNomeValid] = useState(true);
    const [isSobrenomeValid, setIsSobrenomeValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isCpfValid, setIsCpfValid] = useState(true);
    const [isTelefoneValid, setIsTelefoneValid] = useState(true);
    const [isCepValid, setIsCepValid] = useState(true);

    const handleSignUp = () => {
        // Check if all fields are valid
        if (nome && sobrenome && email && cpf && telefone && cep) {
            // Implement your sign-up logic here
        } else {
            // Set the validity state for each field
            setIsNomeValid(!!nome);
            console.log(isNomeValid);
            setIsSobrenomeValid(!!sobrenome);
            setIsEmailValid(!!email);
            setIsCpfValid(!!cpf);
            setIsTelefoneValid(!!telefone);
            setIsCepValid(!!cep);
        }
    };

    return (
        <NativeBaseProvider>
            <ScrollView mt={9}>
                <Heading size="lg" mb={4} textAlign="center" color="primary.500">Digite suas informações</Heading>
                <Box p={4}>
                {!isNomeValid && <Text color="red.500">Please enter your name</Text>}
                    <Input
                        placeholder="Nome"
                        value={nome}
                        onChangeText={setNome}
                        mb={4}
                        isRequired
                        isInvalid={!isNomeValid}
                        
                    />
                    
                    {!isSobrenomeValid && <Text color="red.500">Please enter your last name</Text>}
                    <Input
                        placeholder="Sobrenome"
                        value={sobrenome}
                        onChangeText={setSobrenome}
                        mb={4}
                        isRequired
                        isInvalid={!isSobrenomeValid}
                    />
                    
                    {!isEmailValid && <Text color="red.500">Please enter a valid email address</Text>}
                    <Input
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        mb={4}
                        isRequired
                        keyboardType="email-address"
                        autoCapitalize="none"
                        isInvalid={!isEmailValid}
                    />
                    
                    {!isCpfValid && <Text color="red.500">Please enter a valid CPF</Text>}
                    <Input
                        placeholder="CPF"
                        value={cpf}
                        onChangeText={setCpf}
                        mb={4}
                        isRequired
                        keyboardType="numeric"
                        isInvalid={!isCpfValid}
                    />
                    
                    {!isTelefoneValid && <Text color="red.500">Please enter a valid phone number</Text>}
                    <Input
                        placeholder="Telefone"
                        value={telefone}
                        onChangeText={setTelefone}
                        mb={4}
                        isRequired
                        keyboardType="phone-pad"
                        isInvalid={!isTelefoneValid}
                    />
                    
                    {!isCepValid && <Text color="red.500">Please enter a valid CEP</Text>}
                    <Input
                        placeholder="CEP"
                        value={cep}
                        onChangeText={setCep}
                        mb={4}
                        isRequired
                        keyboardType="numeric"
                        isInvalid={!isCepValid}
                    />
                    
                    <Button onPress={handleSignUp} mb={4}>Cadastrar</Button>
                </Box>
            </ScrollView>
        </NativeBaseProvider>
    );
};

export default SignUpScreen;