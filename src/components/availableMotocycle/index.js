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
            image: "https://wallpaperaccess.com/full/317501.jpg",
        },
        {
            id: 2,
            name: "Yamaha R6",
            displacement: "600cc",
            year: "2022",
            image: "https://wallpaperaccess.com/full/317501.jpg",
        },
        {
            id: 3,
            name: "Kawasaki Ninja ZX-6R",
            displacement: "636cc",
            year: "2022",
            image: "https://wallpaperaccess.com/full/317501.jpg",
        },
        // Ensure unique IDs for all items
        {
            id: 4,
            name: "Suzuki GSX-R600",
            displacement: "600cc",
            year: "2022",
            image: "https://wallpaperaccess.com/full/317501.jpg",
        },
        {
            id: 5,
            name: "Ducati Panigale V2",
            displacement: "955cc",
            year: "2022",
            image: "https://wallpaperaccess.com/full/317501.jpg",
        },
        {
            id: 6,
            name: "Triumph Daytona 675",
            displacement: "675cc",
            year: "2022",
            image: "https://wallpaperaccess.com/full/317501.jpg",
        },
    ];

    // Render item component for each motorcycle
    const renderItem = ({ item }) => (
        <Pressable 
        style={{
                borderRadius: 16,
                margin: 18, 
                width: '40%',
                backgroundColor: '#f2f2f2',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                padding: 10,
            }}
            onPress={() => console.log(item)}
        >
          <Box>
            <Image
                source={{ uri: item.image }}
                alt="Motorcycle"
                style={{ height: 150, width: 150, resizeMode: 'contain' }}
            />
            <View style={{ marginTop: 3 }}>
                <Text style={{ fontSize: 16, fontWeight: '700' }}>{item.name}</Text>
                <Badge colorScheme="darkblue" variant="solid" rounded={5} mt={5}>
                <Text style={{ fontSize: 16 }} color={"white"}>{item.displacement}</Text>
                </Badge>
                <Text style={{ fontSize: 16 }} textAlign={"center"} mt={1}>{item.year}</Text>
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
