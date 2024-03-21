import React from "react";
import SplashScreen from "./src/screens/splashScreen";
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <SplashScreen />
    </NativeBaseProvider>
  );
}
