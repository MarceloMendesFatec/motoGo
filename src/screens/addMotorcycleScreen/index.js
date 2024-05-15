import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    Button,
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
    Stack
} from 'native-base';
import ImagePicker from 'expo-image-picker';

const AddMotorcycleScreen = () => {
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({})



    const fabricantes = [
        "Honda", "Yamaha", "Suzuki", "Kawasaki", "Ducati", "BMW", "Triumph", "KTM", "Harley-Davidson"
    ];

    const ano = Array.from({ length: new Date().getFullYear() - 1990 + 1 }, (_, i) => (1990 + i).toString());
    const cores = ["Branco", "Preto", "Vermelho", "Azul", "Verde", "Amarelo", "Laranja", "Roxo", "Prata", "Cinza", "Marrom", "Bege", "Dourado", "Rosa", "Outra"];
    return (
        <NativeBaseProvider>
            <Container>
                <VStack space={2} p={5}>
                    <Box borderWidth={3} borderColor="gray.200" borderRadius={10} p={3} >
                    <Stack direction="row"  >
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
                        </FormControl>
                    </Stack>
                    <Stack direction="row">
                        <FormControl isRequired w={150} mx={2}>
                        <FormControl.Label _text={{ bold: true }}>Modelo</FormControl.Label>
                            <Input
                                placeholder="Modelo"
                                onChangeText={(value) => setFormData({ ...formData, modelo: value })}
                            />
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
                        </FormControl>
                    </Stack>
                    <Stack direction="row"  >
                        <FormControl isRequired w={150} mx={2}>
                        <FormControl.Label _text={{ bold: true }}>Preço / DIA</FormControl.Label>
                            <Input
                                placeholder="Preço"
                                keyboardType='numeric'
                                onChangeText={(value) => setFormData({ ...formData, preco: value })}
                            />
                        </FormControl>
                        <FormControl isRequired w={150} mx={2}>
                        <FormControl.Label _text={{ bold: true }}>Cilindradas</FormControl.Label>
                            <Input
                                placeholder="Cilindradas"
                                keyboardType='numeric'
                                onChangeText={(value) => setFormData({ ...formData, cilindradas: value })}
                            />
                        </FormControl>
                    </Stack>
                    <Stack direction="row"  >
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
                        </FormControl>
                        <FormControl isRequired w={150} mx={2}>
                        <FormControl.Label _text={{ bold: true }}>Quilometragem</FormControl.Label>
                            <Input
                                placeholder="Quilometragem"
                                keyboardType='numeric'
                                onChangeText={(value) => setFormData({ ...formData, quilometragem: value })}
                            />
                        </FormControl>
                    </Stack>
                    
                    </Box>
                </VStack>


            </Container>

        </NativeBaseProvider>
    );
};

export default AddMotorcycleScreen;