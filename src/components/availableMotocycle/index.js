import React from "react";
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

const AvailableMotocycle = () => {
    // Mock data for the list of motorcycles
    const data = [
        {
            id: 1,
            name: "Honda CBR600RR",
            displacement: "600cc",
            year: "2022",
            image: "https://firebasestorage.googleapis.com/v0/b/motogo-45326.appspot.com/o/motoImagens%2FzivOYKYckZdf1EAslXieyBaUlMX2%2F108.jpg?alt=media&token=b3374d65-f818-4c02-916b-f1adf9ab3960",
            price: 150,
        },
        {
            id: 2,
            name: "Yamaha R6",
            displacement: "600cc",
            year: "2022",
            image: "https://firebasestorage.googleapis.com/v0/b/motogo-45326.appspot.com/o/motoImagens%2FzivOYKYckZdf1EAslXieyBaUlMX2%2F108.jpg?alt=media&token=b3374d65-f818-4c02-916b-f1adf9ab3960",
            price: 150,
        },
        {
            id: 3,
            name: "Kawasaki Ninja ZX-6R",
            displacement: "636cc",
            year: "2022",
            image: "https://firebasestorage.googleapis.com/v0/b/motogo-45326.appspot.com/o/motoImagens%2FzivOYKYckZdf1EAslXieyBaUlMX2%2F108.jpg?alt=media&token=b3374d65-f818-4c02-916b-f1adf9ab3960",
            price: 150,
        },
        {
            id: 4,
            name: "Suzuki GSX-R600",
            displacement: "600cc",
            year: "2022",
            image: "https://firebasestorage.googleapis.com/v0/b/motogo-45326.appspot.com/o/motoImagens%2FzivOYKYckZdf1EAslXieyBaUlMX2%2F108.jpg?alt=media&token=b3374d65-f818-4c02-916b-f1adf9ab3960",
            price: 150,
        },
        {
            id: 5,
            name: "Ducati Panigale V2",
            displacement: "955cc",
            year: "2022",
            image: "https://wallpaperaccess.com/full/317501.jpg",
            price: 150,
        },
        {
            id: 6,
            name: "Triumph Daytona 675",
            displacement: "675cc",
            year: "2022",
            image: "https://wallpaperaccess.com/full/317501.jpg",
            price: 150,
        },
    ];

    // Render item component for each motorcycle
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
            onPress={() => console.log(item)}
        >
          <Box>
            <Image
                source={{ uri: item.image }}
                alt="Motorcycle"
                style={{ height: 150, width: "170", resizeMode: 'contain' , borderRadius: 16}}
            />
            <View style={{ marginTop: 3 }}>
                <Text style={{ fontSize: 16, fontWeight: '700' }}>{item.name}</Text>
                <Badge colorScheme="darkblue" variant="solid" rounded={5} mt={5}>
                <Text style={{ fontSize: 16 }} color={"white"}>{item.displacement}</Text>
                </Badge>
                <Badge colorScheme="info" variant="outline" rounded={5} mt={1} >
                <Text color="primary.700" style={{ fontSize: 16 }} textAlign={"center"} mt={1}>R$:{item.price}/DIA</Text>
                </Badge>
            </View>
            </Box>
        </Pressable>
    );

    return (
        <NativeBaseProvider>
            <FlatList
                data={data}
                numColumns={2}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
                mt={-200}// Adjust content padding if necessary
            />
        </NativeBaseProvider>
    );
};

export default AvailableMotocycle;
