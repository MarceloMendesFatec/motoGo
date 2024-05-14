
import React from "react";
import { NativeBaseProvider, Text, Box, FlatList, Image, ScrollView, Container } from "native-base";


const AvailableMotocycle = () => {
    // Mock data for the list of motorcycles
    const data = [
        {
            id: 1,
            image: "https://example.com/motorcycle1.jpg",
            price: "$5,000",
            year: "2022",
            mileage: "10,000 km",
            location: "City, State",
        },
        {
            id: 2,
            image: "https://example.com/motorcycle2.jpg",
            price: "$7,500",
            year: "2021",
            mileage: "5,000 km",
            location: "City, State",
        },
        {
            id: 3,
            image: "https://example.com/motorcycle3.jpg",
            price: "$10,000",
            year: "2020",
            mileage: "2,000 km",
            location: "City, State",
        },
        {
            id: 4,
            image: "https://example.com/motorcycle4.jpg",
            price: "$15,000",
            year: "2019",
            mileage: "1,000 km",
            location: "City, State",
        },
        {
            id: 5,
            image: "https://example.com/motorcycle5.jpg",
            price: "$20,000",
            year: "2018",
            mileage: "500 km",
            location: "City, State",
        },
        {
            id: 6,
            image: "https://example.com/motorcycle6.jpg",
            price: "$25,000",
            year: "2017",
            mileage: "100 km",
            location: "City, State",
        },
        {
            id: 7,
            image: "https://example.com/motorcycle7.jpg",
            price: "$30,000",
            year: "2016",
            mileage: "50 km",
            location: "City, State",
        },
        {
            id: 8,
            image: "https://example.com/motorcycle8.jpg",
            price: "$35,000",
            year: "2015",
            mileage: "10 km",
            location: "City, State",
        },
        {
            id: 9,
            image: "https://example.com/motorcycle9.jpg",
            price: "$40,000",
            year: "2014",
            mileage: "5 km",
            location: "City, State",
        }
        // Add more mock data as needed
    ];

    // Render item component for each motorcycle
    const renderItem = ({ item }) => (
        <Box borderWidth={1} p={4} my={2} w="40%" mx={5} >
            <Image source={{ uri: item.image }} alt="Motorcycle" h={200} />
            <Text>{item.price}</Text>
            <Text>{item.year}</Text>
            <Text>{item.mileage}</Text>
            <Text>{item.location}</Text>
        </Box>
    );

    return (
        <NativeBaseProvider>
            <FlatList
                data={data}
                numColumns={2}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                mt={-200}
            />
        </NativeBaseProvider>
    );
};

export default AvailableMotocycle;