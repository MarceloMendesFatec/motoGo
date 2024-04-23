import React, { useState } from 'react';
import { Heading, NativeBaseProvider, Text } from "native-base";
import { VStack, Input, Button, Center, Image, Modal } from "native-base";
import { HStack, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState(false);


    const sendPasswordReset = () => {
        if (email === '') {
            setShowModal(true);
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setShowModal(true);
        };
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <NativeBaseProvider>
            <VStack space={10} alignItems="center" p={5} mt={20}>
                <Heading size="xl" color="primary.500">Esqueceu a sua senha?  </Heading>
                <Image source={require('../../assets/Forgot-password.png')} style={{ width: 200, height: 200 }} alt='imagem de esqueceu a senha' />
                <Center>
                    <Text fontSize="md">Não se preocupe ! Insira o seu email cadastrado para receber um link para redefinir a sua senha.</Text>
                </Center>
                <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <Button onPress={sendPasswordReset} w={100} backgroundColor={'primary.500'}>
                    <Text fontSize={"lg"} color={"white"}>Enviar</Text>
                </Button>
            </VStack>


            {showModal && (
                <Modal isOpen={showModal} onClose={closeModal}>
                    <Modal.Content>

                        <HStack justifyContent="center" alignItems="center" m={4}>
                            <Icon as={MaterialIcons} name="warning" size={12} color="danger.500" mr={2} />
                            <Text color="danger.500" fontWeight="bold" fontSize="xl">Atenção!</Text>
                        </HStack>
                        <Text color="gray.600" textAlign="center" fontSize="md">O campo do email não pode estar em branco ou ser um email inválido.</Text>
                        <Button onPress={closeModal} m={4} alignSelf="center" backgroundColor="danger.500">
                            Entendido
                        </Button>



                    </Modal.Content>
                </Modal>
            )}
        </NativeBaseProvider>
    );
};

export default ForgotPasswordScreen;
