import React, { useEffect } from "react";
import { NativeBaseProvider, Box, Image, VStack, HStack, ScrollView, Text, Divider, Button, Center } from "native-base";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const MotorcycleDetails = ({ route }) => {
    const { motorcycle } = route.params; // Obtém o objeto motorcycle passado via navegação

    useEffect(() => {
        console.log("Motorcycle details:", motorcycle);
    }, [motorcycle]);

    // Filtra as chaves numéricas que representam URLs de imagens
    const imageKeys = Object.keys(motorcycle).filter(key => !isNaN(key));
    // Mapeamento de cores
    const colorMapping = {
        Branco: 'white',
        Preto: 'black',
        Vermelho: 'red',
        Azul: 'blue',
        Verde: 'green',
        Amarelo: 'yellow',
        Laranja: 'orange',
        Roxo: 'purple',
        Prata: 'silver',
        Cinza: 'gray',
        Marrom: 'brown',
        Bege: 'beige',
        Dourado: 'gold',
        Rosa: 'pink',
        Outra: 'darkgray', // Usar uma cor padrão para "Outra"
    };

    // Obter a cor correspondente do mapeamento, ou usar 'darkgray' como padrão
    const textColor = colorMapping[motorcycle.cor] || 'darkgray';

    return (
        <NativeBaseProvider>
            
               {/* // Exibe as imagens da moto em um ScrollView horizontal */}
                <HStack space={2} alignItems="center" justifyContent="center" m={5}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {imageKeys.map((key, index) => (
                            <Image
                                key={index}
                                source={{ uri: motorcycle[key] }}
                                alt={`Image ${index}`}
                                size="2xl"
                                resizeMode="cover"
                                borderRadius={8}
                                marginRight={2}
                            />
                        ))}
                    </ScrollView>
                </HStack>
            
                <Box borderWidth={3} borderColor="gray.200" borderRadius={16} p={3} bg="white" m={5} shadow={5}>
                        
                 {/* Detalhes da Motocicleta */}
                    <Text fontSize="2xl" fontWeight="bold" color="primary.500" mb={4} textAlign="center">
                        {motorcycle.fabricante} {motorcycle.modelo}
                    </Text>
                    
                    {/* Duas colunas de atributos */}
                    <HStack justifyContent="space-between">
                        {/* Primeira Coluna */}
                        <VStack space={4} flex={1}>
                            <Box alignItems="center">
                                <Ionicons name="calendar-outline" size={24} color="gray" />
                                <Text fontSize="md" mt={2}> {motorcycle.ano}</Text>
                            </Box>
                            <Divider />
                            <Box alignItems="center">
                                <MaterialCommunityIcons name="engine-outline" size={24} color="black" />
                                <Text fontSize="md" mt={2}> {motorcycle.cilindradas} CC</Text>
                            </Box>
                            <Divider />
                            <Box alignItems="center">
                                <Ionicons name="color-palette-outline" size={24} color="gray" />
                                <Text fontSize="md" mt={2} style={{ color: textColor , fontWeight: 700 }}>{motorcycle.cor}</Text>

                            </Box>
                            <Divider />
                        </VStack>

                        {/* Segunda Coluna */}
                        <VStack space={4} flex={1}>
                            <Box alignItems="center">
                                <Ionicons name="cash-outline" size={24} color="green" />
                                <Text fontSize="md" mt={2}>R$ {motorcycle.preco}/dia</Text>
                            </Box>
                            <Divider />
                            <Box alignItems="center">
                                <Ionicons name="speedometer-outline" size={24} color="blue" />
                                <Text fontSize="md" mt={2}>{motorcycle.quilometragem} km</Text>
                            </Box>
                            <Divider />
                            <Box alignItems="center">
                                <MaterialCommunityIcons name="coolant-temperature" size={24} color="red" />
                                <Text fontSize="md" mt={2}>{motorcycle.refrigeracao}</Text>       
                            </Box>
                            <Divider />
                        </VStack>
                    </HStack>
          
                

                {/* Botão de Ação */}
                <Center mb={5} mt={10}>
                    <Button colorScheme="primary" borderRadius={20} px={10} py={3} _text={{fontWeight: 700, fontSize:18}}>
                        Selecionar datas
                    </Button>
                </Center>
            
               


                </Box>       
           
        </NativeBaseProvider>
    );
};

export default MotorcycleDetails;
