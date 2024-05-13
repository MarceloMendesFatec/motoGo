
import React from "react";
import { NativeBaseProvider, Text, VStack, Pressable, HStack ,Divider} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

const UserOptions = ({ navigation }) => {
    return (
        <NativeBaseProvider>
            <VStack space={3} alignItems="flex-start" m={5} flex={1} justifyContent="space-between">
                <HStack space={2} alignItems="center">
                    <AntDesign name="user" size={24} color="black" />
                    <Pressable onPress={() => console.log("pressionado")}>
                        <Text fontSize="xl" fontWeight="semi-bold">Meus Dados</Text>
                    </Pressable>
                </HStack>
                <Divider bg="gray.300" thickness="1" my="0" orientation="horizontal" />
                <HStack space={2} alignItems="center">
                    <MaterialIcons name="payment" size={24} color="black" />
                    <Pressable onPress={() => console.log("pressionado")}>
                        <Text fontSize="xl" fontWeight="semi-bold">Pagamentos</Text>
                    </Pressable>
                </HStack>
                <Divider bg="gray.300" thickness="1" my="0" orientation="horizontal" />
                <HStack space={2} alignItems="center">
                    <MaterialIcons name="description" size={24} color="black" />
                    <Pressable onPress={() => console.log("pressionado")}>
                        <Text fontSize="xl" fontWeight="semi-bold" >Termos de Uso</Text>
                    </Pressable>
                </HStack>
                <Divider bg="gray.300" thickness="1" my="0" orientation="horizontal" />
                <HStack space={2} alignItems="center">
                    <MaterialIcons name="settings" size={24} color="black" />
                    <Pressable onPress={() =>console.log("pressionado")}>
                        <Text fontSize="xl" fontWeight="semi-bold">Configurações</Text>
                    </Pressable>
                </HStack>
                <Divider bg="gray.300" thickness="1" my="0" orientation="horizontal" />
                <HStack space={2} alignItems="center">
                    <MaterialIcons name="notifications" size={24} color="black" />
                    <Pressable onPress={() => console.log("pressionado")}>
                        <Text fontSize="xl" fontWeight="semi-bold">Notificações</Text>
                    </Pressable>
                </HStack>
                <Divider bg="gray.300" thickness="1" my="0" orientation="horizontal" />
                <HStack space={2} alignItems="center">
                    <MaterialIcons name="help" size={24} color="black" />
                    <Pressable onPress={() => console.log("pressionado")}>
                            <Text fontSize="xl" fontWeight="semi-bold">Ajuda</Text>
                    </Pressable>
                </HStack>
                <Divider bg="gray.300" thickness="1" my="0" orientation="horizontal" />
                <HStack space={2} alignItems="center">
                <MaterialIcons name="share" size={24} color="black" />
                    <Pressable onPress={() => console.log("pressionado")}>
                        <Text fontSize="xl" fontWeight="semi-bold">Compartilhar App</Text>
                    </Pressable>
                </HStack>
                
                
            </VStack>
        </NativeBaseProvider>
    );
};

export default UserOptions;
