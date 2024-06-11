import React, { useEffect } from "react";
import { NativeBaseProvider, Box, Image, HStack, ScrollView } from "native-base";

const MotorcycleDetails = ({ route }) => {
    const { motorcycle } = route.params; // Obtém o objeto motorcycle passado via navegação

    useEffect(() => {
        console.log("Motorcycle details:", motorcycle);
    }, [motorcycle]);

    // Filtra as chaves numéricas que representam URLs de imagens
    const imageKeys = Object.keys(motorcycle).filter(key => !isNaN(key));

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
            
            
        </NativeBaseProvider>
    );
};

export default MotorcycleDetails;
