import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Keyboard
} from 'react-native';
import {
    Box,
    Heading,
    HStack,
    VStack,
    Image,
    Center,
    NativeBaseProvider,
    FormControl,
    Input,
    Select,
    CheckIcon,
    Radio,
    AspectRatio,
    useToast,
    Container,
    Stack,
    Alert,
    Text,
    Button,
    ScrollView,
    IconButton,
    Spinner,
    KeyboardAvoidingView
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import db from "../../service/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const AddMotorcycleScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const [formDataToSend, setFormDataToSend] = useState({});
    const [errors, setErrors] = useState({});
    const [images, setImages] = useState([]); 
    const [image, setImage] = useState(null);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const fabricantes = [
        "Honda", "Yamaha", "Suzuki", "Kawasaki", "Ducati", "BMW", "Triumph", "KTM", "Harley-Davidson"
    ];
    const ano = Array.from({ length: new Date().getFullYear() - 1990 + 1 }, (_, i) => (1990 + i).toString());
    const cores = ["Branco", "Preto", "Vermelho", "Azul", "Verde", "Amarelo", "Laranja", "Roxo", "Prata", "Cinza", "Marrom", "Bege", "Dourado", "Rosa", "Outra"];

    const toast = useToast();
    const auth = getAuth();
    const storage = getStorage();

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true); 
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        onAuthStateChanged(auth, async (authenticatedUser) => {
            if (authenticatedUser) {
                const { uid } = authenticatedUser;
                setFormData({ ...formData, uid: uid });
            } else {
                console.log("Usuário não autenticado");
            }
        });
    }, [auth]);

    if (loading) {
        return (
            <NativeBaseProvider>
                <Box flex={1} justifyContent="center" alignItems="center">
                    <Spinner size="lg" color="primary.500" />
                </Box>
            </NativeBaseProvider>
        );
    }

    const validar = () => {
        const newErrors = {};
        if (images.length === 0) {
            toast.show({
                title: "Atenção!",
                status: "warning",
                duration: 3800,
                placement: "top",
                render: () => (
                    <Box bg="#FFA500" px={4} py={3} borderRadius={10}>
                        <HStack space={3} alignItems="center">
                       <MaterialIcons name="warning" size={24} color="white" />
                        <VStack>
                          <Text fontSize="xl" fontWeight={'bold'} color="white">Atenção!</Text>
                        <Text fontSize="lg" color="white">É obrigatório adicionar uma imagem ao anúncio</Text>
                        </VStack>
                       </HStack>
                    </Box>
                )
            });
            
           return;
        }
        console.log("Objeto com os dados e imagens a serem enviados:")
        setFormDataToSend({ ...formData, ...images });
        console.log(formDataToSend);
        if (!formData.fabricante) newErrors.fabricante = "Campo obrigatório";
        if (!formData.ano) newErrors.ano = "Campo obrigatório";
        if (!formData.modelo) newErrors.modelo = "Campo obrigatório";
        if (!formData.cor) newErrors.cor = "Campo obrigatório";
        if (!formData.preco) newErrors.preco = "Campo obrigatório";
        if (!formData.cilindradas) newErrors.cilindradas = "Campo obrigatório";
        if (!formData.refrigeracao) newErrors.refrigeracao = "Campo obrigatório";
        if (!formData.quilometragem) newErrors.quilometragem = "Campo obrigatório";

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0 ) {
            
            enviarAnuncio();
        }
    };

    const enviarAnuncio = async () => {
        try {
            await addDoc(collection(db, "motos-disponiveis"), formDataToSend);
            toast.show({
                title: "Locação cadastrada com sucesso",
                status: "success",
                description: "Agora sua moto está disponível para locação",
                duration: 3800,
                backgroundColor: "#06B6D4",
                size: "lg"
            });
            setTimeout(() => {
                homeScreen();
            }, 4000);
        } catch (error) {
            console.error("Erro ao cadastrar anúncio:", error);
            toast.show({
                title: "Erro ao cadastrar locação",
                status: "error",
                description: "Ocorreu um erro ao cadastrar sua moto para locação. Tente novamente mais tarde.",
                duration: 3800,
                backgroundColor: "#E53E3E",
                size: "lg"
            });
        }
    };

    const homeScreen = () => {
        navigation.navigate("Home");
    };

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

    const uploadImage = async (uri) => {
        if (!formData.uid) {
            console.error("Usuário não autenticado");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(uri);
            const blob = await response.blob();
            const randomNumber = Math.floor(Math.random() * 1000);
            const imageName = `motoImagens/${formData.uid}/${randomNumber}.jpg`;
            const imageRef = ref(storage, imageName);

            await uploadBytes(imageRef, blob);
            const downloadURL = await getDownloadURL(imageRef);

            setImages([...images, downloadURL]);
            setLoading(false);
        } catch (error) {
            console.error("Erro ao enviar imagem para o Firebase Storage:", error);
        }
    };

    return (
        <NativeBaseProvider>
            <ScrollView horizontal flex={2} my={2} mx={5}  showsHorizontalScrollIndicator={false}>
                <HStack space={2} alignItems="center"  marginLeft={120}>
                    <TouchableOpacity onPress={pickImage}>
                        <Box
                            w={100}
                            h={100}
                            bg="gray.300"
                            borderRadius={10}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <MaterialIcons name="add-a-photo" size={40} color="black" />
                        </Box>
                    </TouchableOpacity>
                    {images.map((image, index) => (
                        <Box
                            key={index}
                            w={150}
                            h={150}
                            bg="gray.100"
                            borderRadius={10}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Image
                                source={{ uri: image }}
                                alt="Alternate Text"
                                size="2xl"
                                resizeMode="cover"
                                borderRadius={10}
                            />
                        </Box>
                    ))}
                </HStack>
            </ScrollView>

            <Container flex={2}>
                <VStack space={2} p={5}>
                    <Box borderWidth={3} borderColor="gray.200" borderRadius={10} p={3} bg="white">
                        <Stack direction="row">
                            <FormControl isRequired w={150} mx={2}>
                                <FormControl.Label _text={{ bold: true }}>Fabricantes</FormControl.Label>
                                <Select
                                    selectedValue={formData.fabricante}
                                    _selectedItem={{
                                        bg: 'primary.100',
                                        endIcon: <CheckIcon size={4} />,
                                    }}
                                    onValueChange={(value) => setFormData({ ...formData, fabricante: value })}
                                >
                                    {fabricantes.map((fabricante, index) => (
                                        <Select.Item key={index} label={fabricante} value={fabricante} />
                                    ))}
                                </Select>
                                {errors.fabricante && (
                                    <Text color="red.500" fontSize="xs" mt={1}>
                                        {errors.fabricante}
                                    </Text>
                                )}
                            </FormControl>
                            <FormControl isRequired w={150} mx={2}>
                                <FormControl.Label _text={{ bold: true }}>Ano/modelo</FormControl.Label>
                                <Select
                                    selectedValue={formData.ano}
                                    _selectedItem={{
                                        bg: 'primary.100',
                                        endIcon: <CheckIcon size={4} />,
                                    }}
                                    onValueChange={(value) => setFormData({ ...formData, ano: value })}
                                >
                                    {ano.map((year, index) => (
                                        <Select.Item key={index} label={year} value={year} />
                                    ))}
                                </Select>
                                {errors.ano && (
                                    <Text color="red.500" fontSize="xs" mt={1}>
                                        {errors.ano}
                                    </Text>
                                )}
                            </FormControl>
                        </Stack>
                        <Stack direction="row">
                            <FormControl isRequired w={150} mx={2}>
                                <FormControl.Label _text={{ bold: true }}>Modelo</FormControl.Label>
                                <Input
                                    placeholder="Modelo"
                                    onChangeText={(value) => setFormData({ ...formData, modelo: value })}
                                />
                                {errors.modelo && (<Text color="red.500" fontSize="xs" mt={1}>{errors.modelo}</Text>)}
                            </FormControl>
                            <FormControl isRequired w={150} mx={2}>
                                <FormControl.Label _text={{ bold: true }}>Cor</FormControl.Label>
                                <Select
                                    selectedValue={formData.cor}
                                    _selectedItem={{
                                        bg: 'primary.100',
                                        endIcon: <CheckIcon size={4} />,
                                    }}
                                    onValueChange={(value) => setFormData({ ...formData, cor: value })}
                                >
                                    {cores.map((cor, index) => (
                                        <Select.Item key={index} label={cor} value={cor} />
                                    ))}
                                </Select>
                                {errors.cor && (<Text color="red.500" fontSize="xs" mt={1}>{errors.cor}</Text>)}
                            </FormControl>
                        </Stack>
                        <Stack direction="row">
                            <FormControl isRequired w={150} mx={2}>
                                <FormControl.Label _text={{ bold: true }}>Preço / DIA</FormControl.Label>
                                <Input
                                    placeholder="Preço"
                                    keyboardType='numeric'
                                    onChangeText={(value) => setFormData({ ...formData, preco: value })}
                                />
                                {errors.preco && (<Text color="red.500" fontSize="xs" mt={1}>{errors.preco}</Text>)}
                            </FormControl>
                            <FormControl isRequired w={150} mx={2}>
                                <FormControl.Label _text={{ bold: true }}>Cilindradas</FormControl.Label>
                                <Input
                                    placeholder="Cilindradas"
                                    keyboardType='numeric'
                                    onChangeText={(value) => setFormData({ ...formData, cilindradas: value })}
                                />
                                {errors.cilindradas && (<Text color="red.500" fontSize="xs" mt={1}>{errors.cilindradas}</Text>)}
                            </FormControl>
                        </Stack>
                        <Stack direction="row">
                            <FormControl isRequired w={150} mx={2}>
                                <FormControl.Label _text={{ bold: true }}>Refrigeração</FormControl.Label>
                                <Select
                                    selectedValue={formData.refrigeracao}
                                    _selectedItem={{
                                        bg: 'primary.100',
                                        endIcon: <CheckIcon size={4} />,
                                    }}
                                    onValueChange={(value) => setFormData({ ...formData, refrigeracao: value })}
                                >
                                    <Select.Item label="AR" value="AR" />
                                    <Select.Item label="LIQUIDA" value="LIQUIDA" />
                                </Select>
                                {errors.refrigeracao && (<Text color="red.500" fontSize="xs" mt={1}>{errors.refrigeracao}</Text>)}
                            </FormControl>
                            <FormControl isRequired w={150} mx={2}>
                                <FormControl.Label _text={{ bold: true }}>Quilometragem</FormControl.Label>
                                <Input
                                    placeholder="Quilometragem"
                                    keyboardType='numeric'
                                    onChangeText={(value) => setFormData({ ...formData, quilometragem: value })}
                                />
                                {errors.quilometragem && (<Text color="red.500" fontSize="xs" mt={1}>{errors.quilometragem}</Text>)}
                            </FormControl>
                        </Stack>
                    </Box>
                </VStack>
            </Container>

            {!isKeyboardVisible && (
                <Box flex={1}>
                    <Button
                        color={"#06B6D4"}
                        title="Concluir a locação"
                        mx={100}
                        mt={85}
                        _text={{ color: 'white', bold: true, fontSize: 'lg' }}
                        onPress={validar}
                    >
                        Adicionar moto
                    </Button>
                </Box>
            )}
        </NativeBaseProvider>
    );
};

export default AddMotorcycleScreen;
