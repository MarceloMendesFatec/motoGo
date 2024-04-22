
import React, { useState } from "react";
import { NativeBaseProvider, Text, Button, Box, Avatar, IconButton, HStack ,Icon} from "native-base";

const UserScreen = ({ navigation }) => {

    const [nome , setNome] = useState("Shikungunya");
    const editUser = () => {
        navigation.navigate("EditUser");
    };

    const logout = () => {
        // Implement logout functionality here
    };

    return (
        <NativeBaseProvider>
            <Box bg="primary.500" py={4}  alignItems="center">
                <Avatar size="2xl" mt={10}/>
                <Text color="white" fontSize="xl" fontWeight="bold" mt={2}>
                    {nome}
                </Text>
              
            </Box>
            <Box flex={1} justifyContent="flex-end" p={4}>
                <Button onPress={logout} colorScheme="red">
                    Logout
                </Button>
            </Box>
        </NativeBaseProvider>
    );
};

export default UserScreen;
