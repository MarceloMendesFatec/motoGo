import {React, useEffect} from "react";
import { NativeBaseProvider, Text } from "native-base";
import Header from "../../components/header";




const HomeScreen = ({ navigation }) => {
    
    return (
        <NativeBaseProvider>
         <Header/>
           
        </NativeBaseProvider>
    );
};

export default HomeScreen;
