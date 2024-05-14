import React from "react";
import { NativeBaseProvider, Text } from "native-base";
import Historical from "../../components/historical";

const HistoricalScreen = ({ navigation }) => {
    return (
        <NativeBaseProvider>
            <Text fontSize={24} fontWeight={700} m={5}>Histórico</Text>
            <Historical/>
        </NativeBaseProvider>
    );
}

export default HistoricalScreen;