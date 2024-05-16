import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
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
    Button

} from 'native-base';
import ImagePicker from 'expo-image-picker';

const AddMotorcycleScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({})
   
   // Dados para o formulário
    const fabricantes = [
        "Honda", "Yamaha", "Suzuki", "Kawasaki", "Ducati", "BMW", "Triumph", "KTM", "Harley-Davidson"
    ];
    const ano = Array.from({ length: new Date().getFullYear() - 1990 + 1 }, (_, i) => (1990 + i).toString());
    const cores = ["Branco", "Preto", "Vermelho", "Azul", "Verde", "Amarelo", "Laranja", "Roxo", "Prata", "Cinza", "Marrom", "Bege", "Dourado", "Rosa", "Outra"];

    // Função para exibir um toast
    const toast = useToast();

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


    return (
        <NativeBaseProvider>
            <Container>
               { /* Formulario */}
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
                                {errors.cor && ( <Text color="red.500" fontSize="xs" mt={1}>{errors.cor}</Text> )}

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
                                <Radio.Group
                                    name="refrigeracao"
                                    value={formData.refrigeracao}
                                    onChange={(value) => setFormData({ ...formData, refrigeracao: value })}
                                >
                                    <VStack space={1}>
                                        <Radio value="AR">
                                            <Text>AR</Text>
                                        </Radio>
                                        <Radio value="LIQUIDA">
                                            <Text>LIQUIDA</Text>
                                        </Radio>
                                    </VStack>
                                </Radio.Group>
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
                        _text={{ color: 'white' , bold: true , fontSize: 'lg'}}
                        onPress={() => {
                            validar();

                        }}
                    >
                        Concluir a locação
                    </Button>
                </Box>
                {/* Fecha botao */}
            </Container>

        </NativeBaseProvider>
    );
};

export default AddMotorcycleScreen;