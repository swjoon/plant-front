// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import Navigation from "./src/navigation/Navigation"

SplashScreen.preventAutoHideAsync();

export default function App() {

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 3000);
  }, []);

  return (
    <Navigation/>
  );
};


