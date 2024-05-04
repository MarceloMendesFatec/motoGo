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
    HStack,Modal,Icon,Image} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState ,useEffect} from "react";
import { BackHandler } from "react-native";

const LoginScreen = ({ navigation }) => {
    //todas as telas recebem o parâmetro navigation

    useEffect(() => {
        const backAction = () => {
          // Intercepta o evento de pressionar o botão de voltar
          // Neste caso, não faz nada, bloqueando o comportamento padrão
          return true; // Retorna true para indicar que o evento foi manipulado
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove(); // Remove o ouvinte quando a tela for desmontada
      }, []);


    //state
    const [formData, setFormData] = useState({});
    const [showModal, setShowModal] = useState(false);
   
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

    const closeModal = () => {
        setShowModal(false);
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
               
                setShowModal(true);
                
                // ...
            });
    };

    useEffect(() => {
        // Limpar o formulário quando o componente for montado
        setFormData({});
    }, []);


    return (
        <NativeBaseProvider>
            {/* box central */}
            <Box p={4} mt={10} flex={1} justifyContent="space-around">
                {/* logo */}
                <Center>
                    <Heading color="primary.500" size="4xl">
                        motoGo
                    </Heading>
                    <Image source={require('../../assets/logo-rafiki.png')} alt="motoGoIcon" style={{ width: 200, height: 200 }} />
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
                            <FontAwesome name="google" size={18} color="white" />
                        </Button>

                    </HStack>
                </Box>
                {/* box formulario */}

            </Box>
            {/* box central */}


            {showModal && (
                <Modal isOpen={showModal} onClose={closeModal}>
                    <Modal.Content>

                        <HStack justifyContent="center" alignItems="center" m={4}>
                            <Icon as={MaterialIcons} name="warning" size={12} color="danger.500" mr={2} />
                            <Text color="danger.500" fontWeight="bold" fontSize="xl">Atenção!</Text>
                        </HStack>
                        <Text color="gray.600" textAlign="center" fontSize="md">Usuário ou senha invalidos !</Text>
                        <Button onPress={closeModal} m={4} alignSelf="center" backgroundColor="danger.500">
                            Entendido
                        </Button>



                    </Modal.Content>
                </Modal>
            )}
        </NativeBaseProvider>
    );
};

export default LoginScreen;
