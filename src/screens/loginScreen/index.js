
import React from "react";
import { NativeBaseProvider, Text, Box, Heading, Input, Button, Link, Center } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';



const LoginScreen = ({navigation}) => {//todas as telas recebem o parâmetro navigation
    return (
        <NativeBaseProvider>
            <Box p={4} mt={10} flex={1} justifyContent="space-around">
                <Center>
                    <Heading color="primary.500" size='4xl' >motoGo</Heading>
                    <MaterialIcons name="sports-motorsports" size={64} color="#06b6d4" />
                </Center>
              <Box>
                <Box mt={4}>
                        <Input placeholder="Username" />
                    </Box>
                    <Box mt={4}>
                        <Input placeholder="Password" type="password" />
                    </Box>
                    <Box mt={4}>
                        <Link alignSelf="flex-end" _text={{ color: "blue.500" }} onPress={() => {}}>
                            Forgot Password?
                        </Link>
                    </Box>
                    <Box mt={4}>
                        <Button colorScheme="primary" onPress={() => {}}>
                            Login
                        </Button>
                    </Box>
              </Box>
               
            </Box>
        </NativeBaseProvider>
    );
}

export default LoginScreen;