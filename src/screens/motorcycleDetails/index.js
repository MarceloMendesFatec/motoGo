import React from "react";
import { NativeBaseProvider, Text, Box, Image, VStack, HStack, Badge } from "native-base";

const MotorcycleDetails = ({ route }) => {
    const { motorcycle } = route.params; // Obtém o objeto motorcycle passado via navegação

    return (
        <NativeBaseProvider>
            <Box flex={1} alignItems="center" justifyContent="center" p={5}>
                <Image 
                    source={{ uri: motorcycle.imagem }}
                    alt="Motorcycle"
                    style={{ height: 300, width: 300, resizeMode: 'contain', borderRadius: 16 }}
                />
                <VStack space={2} mt={5}>
                    <Text fontSize="xl" fontWeight="bold">{motorcycle.modelo}</Text>
                    <Text fontSize="md">Ano: {motorcycle.ano}</Text>
                    <Text fontSize="md">Cilindradas: {motorcycle.cilindradas} CC</Text>
                    <Badge colorScheme="info" variant="outline" rounded={5}>
                        <Text color="primary.700" fontSize="lg">R$:{motorcycle.preco}/DIA</Text>
                    </Badge>
                </VStack>
            </Box>
        </NativeBaseProvider>
    );
};

export default MotorcycleDetails;