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
    Divider,
    IconButton,
    HStack} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const LoginScreen = ({ navigation }) => {
    //todas as telas recebem o parâmetro navigation

    //state
    const [formData, setFormData] = useState({});
   
    //auth
    const auth = getAuth();
    //funções de navegação
    const signUp = () => {
        navigation.navigate("SignUp");
    };
    const forgotPassword = () => {
        navigation.navigate("Forgot");
    };

    const homeScreen = () => {
       navigation.navigate("Home");
    };

    const login = () => {
        console.log('Logando');
        signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log('Usuário logado com sucesso');
                console.log(user);
                homeScreen();
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Erro ao logar');
                console.log(errorCode);
                console.log(errorMessage);
            });
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
                <Box>
                    <Box mt={4}>
                        <Input placeholder="Email" onChangeText={value =>setFormData({...formData,email : value})} />
                    </Box>
                    <Box mt={4}>
                        <Input placeholder="Senha" type="password" onChangeText={value =>setFormData({...formData,password : value})}/>
                    </Box>
                    <Box mt={4}>
                        <Link alignSelf="flex-end" _text={{ color: "info.700" }} onPress={forgotPassword}>
                            Esqueceu a senha?
                        </Link>
                    </Box>
                    <Box mt={4}>
                        <Button shadow="2" onPress={login} _text={{ fontSize: 18, fontWeight: "bold" }}>
                            Entrar
                        </Button>
                        <Link justifyContent='center' mt={4} _text={{ fontSize: "sm", fontWeight: "bold", color: "info.700" }} onPress={signUp} >
                            Não tem uma conta? Cadastre-se
                        </Link>
                    </Box>
                    <Divider mt={5} />
                    <Text textAlign={"center"} color={'primary.600'} mt={5}>Ou faça login com : </Text>
                   
                    <HStack justifyContent="center" p={2} space={4} >
                        <Button shadow="2" onPress={() => { /* handle login button click */ }} backgroundColor="#3b5998">
                            <FontAwesome name="facebook" size={24} color="white" />
                        </Button>
                        <Button shadow="2" onPress={() => { /* handle login button click */ }} backgroundColor="#db4437">
                            <FontAwesome name="google" size={24} color="white" />
                        </Button>

                    </HStack>
                </Box>
                {/* box formulario */}

            </Box>
            {/* box central */}

        </NativeBaseProvider>
    );
};

export default LoginScreen;
