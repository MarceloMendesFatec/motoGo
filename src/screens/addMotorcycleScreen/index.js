import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Style
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
    Spinner

} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import db from "../../service/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { getAuth, onAuthStateChanged } from "firebase/auth";




const AddMotorcycleScreen = ({ navigation }) => {
    
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({})
    const [images, setImages] = useState([]); // Alterado de setImage para setImages
    const [image, setImage] = useState(null);

    // Dados para o formulário
    const fabricantes = [
        "Honda", "Yamaha", "Suzuki", "Kawasaki", "Ducati", "BMW", "Triumph", "KTM", "Harley-Davidson"
    ];
    const ano = Array.from({ length: new Date().getFullYear() - 1990 + 1 }, (_, i) => (1990 + i).toString());
    const cores = ["Branco", "Preto", "Vermelho", "Azul", "Verde", "Amarelo", "Laranja", "Roxo", "Prata", "Cinza", "Marrom", "Bege", "Dourado", "Rosa", "Outra"];

    // Função para exibir um toast
    const toast = useToast();
    const auth = getAuth();
    const storage = getStorage();

    useEffect(() => {
        
        onAuthStateChanged(auth, async (authenticatedUser) => {
            if (authenticatedUser) {
                const { uid } = authenticatedUser;
                console.log(uid);
                setFormData({ ...formData, uid: uid });
                console.log(formData);
            } else {
                console.log("Usuário não autenticado");
            }
        });
    }, [auth]);

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

    // Função para validar os campos do formulário
    const validar = () => {
        const newErrors = {};
        console.log(formData);
        if (!formData.fabricante) {
            newErrors.fabricante = "Campo obrigatório";
        }
        if (!formData.ano) {
            newErrors.ano = "Campo obrigatório";
        }
        if (!formData.modelo) {
            newErrors.modelo = "Campo obrigatório";
        }
        if (!formData.cor) {
            newErrors.cor = "Campo obrigatório";
        }
        if (!formData.preco) {
            newErrors.preco = "Campo obrigatório";
        }
        if (!formData.cilindradas) {
            newErrors.cilindradas = "Campo obrigatório";
        }
        if (!formData.refrigeracao) {
            newErrors.refrigeracao = "Campo obrigatório";
        }
        if (!formData.quilometragem) {
            newErrors.quilometragem = "Campo obrigatório";
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            console.log(formData);
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
        }

    };

    const homeScreen = () => {
        navigation.navigate("Home");
    };

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

    const uploadImage = async (uri) => {
        if (!formData.uid) {
            console.error("Usuário não autenticado");
            return;
        }

        try {
           setLoading(true);
            const response = await fetch(uri);
            const blob = await response.blob();
            const randomNumber = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
            const imageName = `motoImagens/${formData.uid}/${randomNumber}.jpg`; // Append the random number to the image name
            const imageRef = ref(storage, imageName); // Use the updated image name in the reference

            await uploadBytes(imageRef, blob);
            console.log("Imagem enviada para o Firebase Storage");

            const downloadURL = await getDownloadURL(imageRef);
            console.log("URL da imagem:", downloadURL);

            setImages([...images, downloadURL]);


            setLoading(false);
        } catch (error) {
            console.error("Erro ao enviar imagem para o Firebase Storage:", error);
        }
    };


   

    return (
        <NativeBaseProvider>
            
            <ScrollView horizontal flex={2} my={2} mx={5} p={0} showsHorizontalScrollIndicator={false}>
                <HStack space={2} alignItems="center">
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
                {/* Formulario */}
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
                {/* Fecha formulario */}
                {/* Botão para concluir a locação */}
                <Box p={5}>
                    <Button
                        color={"#06B6D4"}
                        title="Concluir a locação"
                        _text={{ color: 'white', bold: true, fontSize: 'lg' }}
                        onPress={() => {
                            validar();

                        }}
                    >
                        Adicionar moto 
                    </Button>
                </Box>
                {/* Fecha botao */}
            </Container>

        </NativeBaseProvider>
    );
};

export default AddMotorcycleScreen;