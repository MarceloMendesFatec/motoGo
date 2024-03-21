import React from "react";
import {
    NativeBaseProvider,
    Text,
    Box,
    Heading,
    Input,
    Button,
    Link,
    Center,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
    //todas as telas recebem o parâmetro navigation

    const signUp = () => {
        navigation.navigate("SignUp");
    };
    
    return (
        <NativeBaseProvider>
            {/* box central */}
            <Box p={4} mt={10} flex={1} justifyContent="space-around">
                {/* logo */}
                <Center>
                    <Heading color="primary.500" size="4xl">
                        motoGo
                    </Heading>
                    <MaterialIcons name="sports-motorsports" size={64} color="#06b6d4" />
                </Center>
                {/* box do formulario */}
                <Box>
                    <Box mt={4}>
                        <Input placeholder="Usuário" />
                    </Box>
                    <Box mt={4}>
                        <Input placeholder="Senha" type="password" />
                    </Box>
                    <Box mt={4}>
                        <Link alignSelf="flex-end" _text={{ color: "info.700" }} onPress={() => { }}>
                            Esqueceu a senha?
                        </Link>
                    </Box>
                    <Box mt={4}>
                        <Button shadow="2" onPress={() => { }} _text={{ fontSize: 18, fontWeight: "bold" }}>
                            Entrar
                        </Button>
                        <Link justifyContent='center' mt={4} _text={{ fontSize: "sm", fontWeight: "bold", color: "info.700" }} onPress={signUp} >
                            Não tem uma conta? Cadastre-se
                        </Link>
                    </Box>

                </Box>
                {/* box formulario */}
            </Box>
            {/* box central */}

        </NativeBaseProvider>
    );
};

export default LoginScreen;
