import React from "react";
import { Box, Center, Divider, NativeBaseProvider, Text, VStack } from "native-base";
import { HStack, Avatar, Icon } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from "native-base";

const Header = ({ navigation }) => {
    return (
        <NativeBaseProvider>
            <StatusBar backgroundColor="black" barStyle="light-content" />
            <HStack  h={20}>
                <Box bg="white" size={16} borderRadius="xl" m={5}>
                    <Center p={1}>
                        <MaterialIcons name="location-pin" size={44} color="gray" />
                    </Center>
                </Box>
                <VStack mt={5}>
                    <Text fontSize={"md"}>Sua Localização:</Text>
                    <Text bold fontSize={"xl"}>Itu ,Sp</Text>
                </VStack>
                 <Avatar mx={24} mt={5} size={"lg"}/>       
                
            </HStack>
            <Divider mt={4} />
        </NativeBaseProvider>
    );
};


export default Header;
