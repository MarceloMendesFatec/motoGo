import React, { useState } from 'react';
import { NativeBaseProvider, Box, Image, Checkbox, Modal, Input, Button, ScrollView, Text, Heading, VStack, FormControl, Divider, Center, HStack, Icon } from 'native-base';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import db from '../../service/firebaseConfig';
import { setDoc, doc, getDoc } from "firebase/firestore";
import { KeyboardAvoidingView } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";


const SignUpScreen = ({ navigation }) => {


    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({})
    const [termsChecked, setTermsChecked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const auth = getAuth();



    const closeModal = () => {
        setShowModal(false);
    };

    const homeScreen = () => {
        navigation.navigate("Home");
    };

    const cadastrar = async () => {
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

                    // Adicione outras informações que você deseja armazenar
                })
                    .then(() => {
                        // Documento criado com sucesso
                        console.log('Informações do usuário armazenadas no banco  com sucesso');
                        // Você pode redirecionar o usuário ou fazer qualquer outra coisa aqui
                        homeScreen();
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
                setShowModal(true);
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
            <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
                <ScrollView>
                    <VStack space={2} p={5}>
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
            </KeyboardAvoidingView>

            <Center>
                <Divider my={3} />
                <Button onPress={validar} colorScheme="primary" m={5} w={"60%"} shadow={"2"} _text={{ fontWeight: 'bold', fontSize: 16 }}>Cadastrar</Button>
            </Center>


            {showModal && (
                <Modal isOpen={showModal} onClose={closeModal}>
                    <Modal.Content>

                        <HStack justifyContent="center" alignItems="center" m={4}>
                            <Icon as={MaterialIcons} name="warning" size={12} color="danger.500" mr={2} />
                            <Text color="danger.500" fontWeight="bold" fontSize="xl">Atenção!</Text>
                        </HStack>
                        <Text color="gray.600" textAlign="center" fontSize="md">Email ja cadastrado !</Text>
                        <Button onPress={closeModal} m={4} alignSelf="center" backgroundColor="danger.500">
                            Entendido
                        </Button>



                    </Modal.Content>
                </Modal>
            )}
        </NativeBaseProvider>


    );

};

export default SignUpScreen;


