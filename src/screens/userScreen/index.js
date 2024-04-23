import React, { useState } from "react";
import {
    NativeBaseProvider,
    Text,
    Button,
    Box,
    Avatar,
    IconButton,
    HStack,
    Icon,
    VStack,
    Divider,
    Modal,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
const UserScreen = ({ navigation }) => {

    const [showModal, setShowModal] = useState(false);
    //user é um array de objeto que contem o usuario logado
    const [user, setUser] = useState({
        nome: "John Doe",
        idade: 30,
        telefone: "1234567890",
        cep: "12345-678",
        email: "johndoe@example.com",
    });
   
    const editUser = () => {
        navigation.navigate("EditUser");
    };


    const handleLogout = () => {
        // Lógica de logout
        setShowModal(false);
        navigation.navigate("Login");
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <NativeBaseProvider>
            <Box bg="primary.500" py={4} alignItems="center">
                <Avatar size="2xl" mt={10} />
                <HStack>
                    <Text color="white" fontSize="2xl" fontWeight="bold" mt={2}>
                        {user.nome}
                    </Text>
                    <IconButton
                        mt={1}
                        icon={<MaterialIcons name="edit" size={24} color="white" />}
                        onPress={editUser}
                    />
                </HStack>
                <Text color="white" fontSize="md" fontWeight="bold">
                    {user.email}
                </Text>
            </Box>
            <Box
                borderWidth={3}
                borderColor="gray.200"
                borderRadius={10}
                p={2}
                mt={50}
                m={2}
            >
                <VStack>
                    <Text fontWeight="bold">Nome:</Text>
                    <Text>{user.nome}</Text>
                    <Text fontWeight="bold">Idade:</Text>
                    <Text>{user.idade}</Text>
                    <Text fontWeight="bold">Telefone:</Text>
                    <Text>{user.telefone}</Text>
                    <Text fontWeight="bold">CEP:</Text>
                    <Text>{user.cep}</Text>
                    <Text fontWeight="bold">Email:</Text>
                    <Text>{user.email}</Text>
                </VStack>
            </Box>
            <Divider mt={140} />
            <Box flex={1} justifyContent="flex-end" p={4}>
                <Button onPress={openModal} colorScheme="red">
                    <HStack>
                        <MaterialIcons name="logout" size={24} color="white" />
                        <Text color={"white"}>Sair</Text>
                    </HStack>
                </Button>
            </Box>
            {showModal && (
                <Modal isOpen={showModal} onClose={closeModal}>
                    <Modal.Content>
                        <Modal.CloseButton />
                        <Modal.Header>Confirmar saída</Modal.Header>
                        <Modal.Body>
                            <Text>Deseja realmente sair do aplicativo?</Text>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button onPress={closeModal}>Cancelar</Button>
                                <Button onPress={handleLogout} colorScheme="red">
                                    Sair
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            )}
        </NativeBaseProvider>
    );
};

export default UserScreen;
