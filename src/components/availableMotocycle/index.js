import React, { useState, useEffect } from "react";
import {
    NativeBaseProvider,
    Text,
    Box,
    FlatList,
    Image,
    VStack,
    HStack,
    IconButton,
    Icon,
    Pressable,
    Badge,
} from "native-base";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, View } from "react-native";
import db from "../../service/firebaseConfig";
import { collection, getDocs ,  onSnapshot } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

const AvailableMotocycle = () => {

   

    const [motorcycles, setMotorcycles] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
      // Referência à coleção 'motos-disponiveis' do Firestore
      const motosRef = collection(db, "motos-disponiveis");

      // Configuração do listener em tempo real
      const unsubscribe = onSnapshot(motosRef, (querySnapshot) => {
        const motorcyclesData = [];
        querySnapshot.forEach((doc) => {
          motorcyclesData.push({ id: doc.id, ...doc.data() }); // Inclui o ID do documento para usar como chave única
        });
        setMotorcycles(motorcyclesData);
        console.log("Motorcycles data updated:", motorcyclesData);
      });

      // Função de limpeza para desinscrever o listener
      return () => unsubscribe();
    }, []); // Array de dependências vazio para executar apenas uma vez ao montar o componente


    // Renderiza cada item da lista de motocicletas
    const renderItem = ({ item }) => (
        <Pressable 
        style={{
                borderRadius: 16, 
                width: '45%',
                backgroundColor: '#f2f2f2',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
            }}
            m={2}
            p={3}
            onPress={() => navigation.navigate("MotorcycleDetails", { motorcycle: item })} // Passe os dados da moto para a próxima tela

        >
          <Box>
            <Image
                source={{ uri: item[0] }}
                alt="Motorcycle"
                style={{ height: 150, width: 170, resizeMode: 'contain' , borderRadius: 16}}
            />
            <View style={{ marginTop: 3 }}>
                <Text style={{ fontSize: 16, fontWeight: '700', textAlign: "center" }}>{item.modelo}</Text>
                <Badge colorScheme="darkblue" variant="solid" rounded={5} mt={5}>
                <Text style={{ fontSize: 16 }} color={"white"}>{item.cilindradas} CC</Text>
                </Badge>
                <Badge colorScheme="info" variant="outline" rounded={5} mt={1} >
                <Text color="primary.700" style={{ fontSize: 16 }} textAlign={"center"} mt={1}>R$:{item.preco}/DIA</Text>
                </Badge>
            </View>
            </Box>
        </Pressable>
    );

    return (
        <NativeBaseProvider>
            <FlatList
                data={motorcycles}
                numColumns={2}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                marginLeft={2}
                mt={-200}// Adjust content padding if necessary
            />
        </NativeBaseProvider>
    );
};

export default AvailableMotocycle;
