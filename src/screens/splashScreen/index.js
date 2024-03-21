import React from "react";
import { NativeBaseProvider, Text, Box, Heading } from "native-base";
import * as Animatable from 'react-native-animatable';
import { MaterialIcons } from '@expo/vector-icons';

const splashScreen = () => {
    return (
        <NativeBaseProvider>
            <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
                <Animatable.View animation="fadeIn" duration={4000}>
                    <Heading color="primary.500" size='3xl'> motoGo</Heading>
                    <Box mt={4} justifyContent="center" alignItems="center" >
                        <MaterialIcons name="sports-motorsports" size={64} color="#06b6d4" />
                    </Box>
                </Animatable.View>
            </Box>
        </NativeBaseProvider>
    );
}

export default splashScreen;