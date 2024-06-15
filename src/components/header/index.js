import React, { useState, useEffect } from "react";
import { Box, Center, Divider, NativeBaseProvider, Text, VStack, HStack, Avatar, Icon, StatusBar } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection } from "firebase/firestore";
import db from "../../service/firebaseConfig";

const Header = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
            if (authenticatedUser) {
                const { uid } = authenticatedUser;
                const userRef = doc(collection(db, "users"), uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    setUser({ uid, ...userDoc.data() });
                } else {
                    console.error("Documento do usuário não encontrado");
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    if (loading) {
        return null;
    }

    return (
        <NativeBaseProvider>
            <Box bg="gray.100" p={4} mt={0}>
                <HStack h={20}>
                    <Box bg="white" size={16} borderRadius="xl" m={5}>
                        <Center p={1}>
                            <MaterialIcons name="location-pin" size={44} color="gray" />
                        </Center>
                    </Box>
                    <VStack mt={5}>
                        <Text fontSize={"md"}>Sua Localização:</Text>
                        <Text bold fontSize={"xl"}>Itu, SP</Text>
                    </VStack>
                    <Avatar
                        mx={10}
                        mt={5}
                        size={"lg"}
                        source={{ uri: user?.avatar || 'https://via.placeholder.com/150' }}
                        // Adicione uma chave única para forçar a atualização da imagem
                        key={user?.avatar}
                    />
                </HStack>
                <Divider mt={4} />
                <Text fontSize={"xl"} bold mt={2} ml={5} color="primary.600">Olá, {user?.name || "Visitante"}</Text>
                <Text fontSize={"xl"} bold mt={1} ml={5} color="primary.600">Escolha a sua motocicleta :  </Text>
            </Box>
        </NativeBaseProvider>
    );
};

export default Header;
