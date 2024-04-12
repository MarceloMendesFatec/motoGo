import React from "react";
import { NativeBaseProvider, Text } from "native-base";

const UserScreen = ({ navigation }) => {
    return (
        <NativeBaseProvider>
            <Text>userScreen</Text>
        </NativeBaseProvider>
    );
};

export default UserScreen;
