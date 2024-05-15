import React from "react";
import { NativeBaseProvider, Text, Container, Button, Image, Box, HStack, VStack, ScrollView } from "native-base";
import { FontAwesome5 } from '@expo/vector-icons';


const MotorcycleDetails = ({ navigation }) => {
    return (
        <NativeBaseProvider>
            <Container>
                <ScrollView>
                    <Box>
                        <Image
                            source={{ uri: "https://wallpaperaccess.com/full/317501.jpg" }}
                            alt="Honda CBR600RR"
                            size="xl"
                        />
                        <VStack space={4} p="4">
                            <Text fontSize="xl" bold>Honda CBR600RR</Text>
                            <HStack space={4}>
                                <Text fontSize="md">600cc</Text>
                                <Text fontSize="md">2022</Text>
                            </HStack>
                            <Text fontSize="md">R$ 150,00</Text>
                            <Button
                                startIcon={<FontAwesome5 name="motorcycle" size={24} color="white" />}
                                onPress={() => navigation.navigate("Rent")}
                            >
                                Alugar
                            </Button>
                        </VStack>
                    </Box>
                </ScrollView>
            </Container>
        </NativeBaseProvider>
    );
}

export default MotorcycleDetails;
