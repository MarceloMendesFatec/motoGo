import React, { useState } from 'react';
import { NativeBaseProvider, Box, Image, Checkbox, Input, Button, ScrollView, Text, Heading, VStack, FormControl, Divider, Center } from 'native-base';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import db from '../../service/firebaseConfig';
import { setDoc, doc } from "firebase/firestore";


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
                const user = userCredential.user;
                console.log(user.uid);// ID do usuário gerado no auth

                // Crie um documento no Firestore com o ID do usuário gerado e as informações adicionais
                const userDocRef = doc(db, "users", user.uid); // "users" é o nome da coleção onde você deseja armazenar os dados do usuário
                setDoc(userDocRef, {
                    name: formData.name,
                    email: formData.email,
                    telefone: formData.telefone,
                    cep: formData.cep,
                    cpf: formData.cpf,
                    // Adicione outras informações que você deseja armazenar
                })
                .then(() => {
                    // Documento criado com sucesso
                    console.log('Informações do usuário armazenadas no banco  com sucesso');
                    // Você pode redirecionar o usuário ou fazer qualquer outra coisa aqui
                })
                .catch((error) => {
                    console.error('Erro ao armazenar informações do usuário:', error);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Erro ao cadastrar:');
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
        } else if (formData.name.length < 3) {
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
        } else if (formData.password !== formData.passwordCheck) {
            newErrors.passwordCheck = 'As senhas não conferem';
        }

        // Verificar se os termos de uso foram aceitos
        if (!termsChecked) {
            newErrors.terms = 'Você deve aceitar os termos de uso';
        }

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
            cadastrar();
        }
    }





    return (
        <NativeBaseProvider>
            <Box>
                <Center>
                    <Heading size="xl" mb={4} mt={100} textAlign="center" color="primary.500">Cadastre-se no motoGo!</Heading>
                    <Center>
                        <Image source={require('../../assets/cadastro-motogo.png')} alt="motoGoIcon" style={{ width: 100, height: 100 }} />
                        <Text fontSize="md" mt={3} color="gray.500">Preencha os campos abaixo para se cadastrar</Text>
                    </Center>
                </Center>
                <Divider m={2} />
            </Box>
            <ScrollView>
                <VStack space={2}  p={5}>
                    <Box borderWidth={3} borderColor="gray.200" borderRadius={10} p={1} >
                        <VStack space={2} mt={1} p={5}>
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
                                    <FormControl isRequired>
                                        <FormControl.Label _text={{ bold: true }}>Senha</FormControl.Label>
                                        <Input placeholder="Digite sua senha" type='password' onChangeText={value => setFormData({ ...formData, password: value })} />
                                        {errors.password && <Text color="red.500">{errors.password}</Text>}
                                    </FormControl>
                                    <FormControl isRequired _text={{ bold: true }}>
                                        <FormControl.Label>Confirme sua senha</FormControl.Label>
                                        <Input placeholder="Confirme sua senha" type='password' onChangeText={value => setFormData({ ...formData, passwordCheck: value })} />
                                        {errors.passwordCheck && <Text color="red.500">{errors.passwordCheck}</Text>}
                                    </FormControl>
                                </FormControl>
                                <FormControl isRequired _text={{ bold: true }}>
                                    <FormControl.Label mt={2}>
                                        <Checkbox value={termsChecked} onChange={() => setTermsChecked(!termsChecked)}>
                                            Li e concordo com os <Text color="blue.500" textDecorationLine="underline">termos de uso</Text>
                                        </Checkbox>
                                    </FormControl.Label>
                                    {errors.terms && <Text color="red.500">{errors.terms}</Text>}
                                </FormControl>
                            {/* Adicione os outros campos de formulário aqui */}
                        </VStack>
                    </Box>
                </VStack>
            </ScrollView>
            <Center>
                <Divider my={3} />
                <Button onPress={validar} colorScheme="primary" m={5} w={"60%"} shadow={"2"} _text={{fontWeight: 'bold', fontSize: 16}}>Cadastrar</Button>
            </Center>
        </NativeBaseProvider>
    );

};

export default SignUpScreen;


