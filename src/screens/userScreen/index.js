import React, { useState, useEffect } from "react";
import {
    NativeBaseProvider,
    Text,
    Button,
    Box,
    Avatar,
    IconButton,
    HStack,
    Divider,
    Modal,
    Spinner
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import UserOptions from "../../components/userOptions";
import db from "../../service/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';

const UserScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const auth = getAuth();
    const storage = getStorage();

    //verificar se o usuario esta logado
    useEffect(() => {
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
                setLoading(false);
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return unsubscribe;
    }, [auth]);

    //funcao para escolher a imagem da galeria
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const localUri = result.assets[0].uri;
            setImage(localUri);
            await uploadImage(localUri);
        }
    };

    //funcao para enviar a imagem para o firebase storage
    const uploadImage = async (uri) => {
        if (!user?.uid) {
            console.error("Usuário não autenticado");
            return;
        }

        try {
           setLoading(true);
            const response = await fetch(uri);
            const blob = await response.blob();
            const imageRef = ref(storage, `avatars/${user.uid}.jpg`);

            await uploadBytes(imageRef, blob);
            console.log("Imagem enviada para o Firebase Storage");

            const downloadURL = await getDownloadURL(imageRef);
            console.log("URL da imagem:", downloadURL);

            const userRef = doc(collection(db, "users"), user.uid);
            await updateDoc(userRef, { avatar: downloadURL });
            console.log("URL da imagem atualizada no Firestore");

            setUser((prevUser) => ({ ...prevUser, avatar: downloadURL }));
            setLoading(false);
        } catch (error) {
            console.error("Erro ao enviar imagem para o Firebase Storage:", error);
        }
    };

    //deslogar o usuario
    const handleLogout = () => {
        setShowModal(false);
        signOut(auth)
            .then(() => {
                console.log("Usuário deslogado");
                navigation.navigate("Login");
            })
            .catch((error) => {
                console.log("Erro ao deslogar", error);
            });
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    //carregar o spinner enquanto a requisicao nao termina
    if (loading) {
        return (
            <NativeBaseProvider>
                <Box flex={1} justifyContent="center" alignItems="center">
                    <Spinner size="lg" color="primary.500" />
                </Box>
            </NativeBaseProvider>
        );
    }

    return (
        <NativeBaseProvider>
            <Box bg="primary.500" py={4} alignItems="center">
                <Avatar size="2xl" mt={10} source={{ uri: user?.avatar || 'https://via.placeholder.com/150' }}>
                    <Avatar.Badge bg="green.500" />    
                </Avatar>
                <HStack>
                    <Text color="white" fontSize="2xl" fontWeight="bold" mt={2}>
                        {user?.name}
                    </Text>
                    <IconButton
                        mt={1}
                        icon={<MaterialIcons name="edit" size={24} color="white" />}
                        onPress={pickImage}
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
