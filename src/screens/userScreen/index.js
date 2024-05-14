import React, { useState, useEffect} from "react";
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
    Spinner
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getFirestore, getDoc } from "firebase/firestore";
import UserOptions from "../../components/userOptions";
import db from "../../service/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";




const UserScreen = ({ navigation }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true); // Estado de carregamento
    //auth
    const auth = getAuth();
    //state
    const [showModal, setShowModal] = useState(false);
    //user é um array de objeto que contem o usuario logado
    const storage = getStorage();

    // UseEffect para verificar se o usuário está autenticado e carregar seus dados do banco de dados
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
            if (authenticatedUser) {
                const { uid } = authenticatedUser; // ID do usuário logado
                const userRef = doc(collection(db, "users"), uid); // Referência ao documento do usuário
                const userDoc = await getDoc(userRef); // Obtem o documento do usuário

                if (userDoc.exists) {
                    setLoading(false); // Altera o estado de carregamento
                    setUser({ ...user, uid });
                    console.log("Usuário autenticado", uid);
                    setUser(userDoc.data()); // Define o estado do usuário com os dados do documento
                    console.log("user data:", userDoc.data());
                } else {
                    console.error("Documento do usuário não encontrado");
                }
            } else {
                setUser(null); // Limpa o estado do usuário se não estiver autenticado
            }
        });

        return unsubscribe;


    }, [auth, db]); // Inclui auth e db na lista de dependências


    // Se o estado de carregamento for verdadeiro, exibe um spinner
    if (loading) {
        return (
            <NativeBaseProvider>
                <Box flex={1} justifyContent="center" alignItems="center">
                    <Spinner size="lg" color="primary.500" />
                </Box>
            </NativeBaseProvider>
        );
    }

    
    const editPhoto = async () => {
       
    }



    // Função para deslogar o usuário
    const handleLogout = () => {
        // Lógica de logout
        setShowModal(false);
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                console.log("Usuário deslogado");
            })
            .catch((error) => {
                // An error happened.
                console.log("Erro ao deslogar");
            });

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
                <Avatar size="2xl" mt={10} source={{ uri: user?.avatar || 'https://via.placeholder.com/150' }} />
                <HStack>
                    <Text color="white" fontSize="2xl" fontWeight="bold" mt={2}>
                        {user?.name}
                    </Text>
                    <IconButton
                        mt={1}
                        icon={<MaterialIcons name="edit" size={24} color="white" />}
                        onPress={editPhoto}
                    />
                </HStack>
                <Text color="white" fontSize="md" fontWeight="bold">
                    {user?.email}
                </Text>
            </Box>
            <UserOptions />


            <Box flex={1} justifyContent="flex-end" p={4}>
                <Divider bg="gray.500" thickness="2" my="3" orientation="horizontal" />
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
