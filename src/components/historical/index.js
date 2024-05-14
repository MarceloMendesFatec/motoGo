import React from "react";
import { NativeBaseProvider, Text, FlatList, Box, ScrollView, Container, Divider, HStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const Historical = ({ navigation }) => {
    const mockData = [
        { id: 1, date: "2022-01-01", success: true },
        { id: 2, date: "2022-01-02", success: true },
        { id: 3, date: "2022-01-03", success: true },
        { id: 4, date: "2022-01-04", success: true},
        { id: 5, date: "2022-01-05", success: true },
        { id: 6, date: "2022-01-06", success: true },
        { id: 7, date: "2022-01-07", success: true },
        { id: 8, date: "2022-01-08", success: true },
        { id: 9, date: "2022-01-09", success: true },
        { id: 10, date: "2022-01-10", success: true },
        // Add more mock data here
    ];

    const renderItem = ({ item }) => (
       <ScrollView>
            <Box>
                <TouchableOpacity>
                    <Box
                        bg="gray.100"
                        p={4}
                        my={5}
                        mx={3}
                        borderRadius={8}
                        flexDirection="row"
                        justifyContent="space-between"
                        shadow={3}
                    >
                        <Text color="primary.500" fontWeight={700}>{item.date}</Text>
                        <HStack space={5}>
                            <FontAwesome name="edit" size={24} color="gray" />
                            <FontAwesome name="trash-o" size={24} color="gray" />
                            <FontAwesome name="check-circle" size={24} color="green" />
                        </HStack>
                    </Box>
                </TouchableOpacity>
            </Box>
      </ScrollView>
    );

    const handleEdit = (id) => {
        // Handle edit logic here
        console.log("Edit item with id:", id);
    };

    const handleDelete = (id) => {
        // Handle delete logic here
        console.log("Delete item with id:", id);
    };

    return (
        <NativeBaseProvider>
            <Box flex={1} safeArea>
                <Divider />
                <FlatList
                    data={mockData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            </Box>
        </NativeBaseProvider>
    );
};

export default Historical;
