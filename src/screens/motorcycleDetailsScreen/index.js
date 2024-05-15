import React from "react";
import { NativeBaseProvider, Text, Container, Button, Image, Box, HStack, VStack, ScrollView } from "native-base";
import MotorcycleDetails from "../../components/motorcycleDetail";

const MotorcycleDetailsScreen = ({ navigation }) => {

    return (
        <NativeBaseProvider>
            <MotorcycleDetails/>
        </NativeBaseProvider>
    );
};

export default MotorcycleDetailsScreen;