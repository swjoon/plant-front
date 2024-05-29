import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screen/LoginScreen";
import SignupScreen from "../screen/SignupScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import AddDeviceScreen from "../screen/AddDeviceScreen";
import DeviceDetailScreen from "../screen/DeviceDetailScreen";
import SettingScreen from "../screen/SettingScreen";
import BoardDetailScreen from "../screen/BoardDetailScreen";
import BoardAddScreen from "../screen/BoardAddScreen";
import BoardUpdateScreen from "../screen/BoardUpdateScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FindPwScreen from "../screen/FindPwScreen";
import ChangePWScreen from "../screen/ChangePWScreen";
import ChangeNickScreen from "../screen/ChangeNickScreen";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="로그인" component={LoginScreen} options={{ headerShown: false }}/>   
        <Stack.Screen name="회원가입" component={SignupScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="비밀번호찾기" component={FindPwScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="메인화면" component={BottomTabNavigator} options={{ headerShown: false }}/>
        <Stack.Screen name="디바이스등록" component={AddDeviceScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="deviceInfo" component={DeviceDetailScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Setting" component={SettingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="게시판" component={BoardDetailScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="글쓰기" component={BoardAddScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="글수정" component={BoardUpdateScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="비밀번호변경" component={ChangePWScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="닉네임변경" component={ChangeNickScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
