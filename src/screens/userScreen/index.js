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
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
const UserScreen = ({ navigation }) => {
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

    const logout = () => {
        navigation.navigate("Login");
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
                <Button onPress={logout} colorScheme="red">
                    <HStack><MaterialIcons name="logout" size={24} color="white" />
                        <Text color={"white"}>Sair</Text>
                    </HStack>
                </Button>
            </Box>
        </NativeBaseProvider>
    );
};

export default UserScreen;
