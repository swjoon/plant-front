import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import MainScreen from "../screen/MainScreen";
import AddDeviceScreen from "../screen/AddDeviceScreen";
import BoardScreen from "../screen/BoardScreen";
import UserScreen from "../screen/UserScreen";

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () =>{
  return (
    <BottomTab.Navigator initialRouteName="ScreenA">
      <BottomTab.Screen name="home" component={MainScreen} options={{
          tabBarIcon: () => (
            <FontAwesome name="home" size={24} color={"black"} />
          ),
        }}/>
      <BottomTab.Screen name="device" component={AddDeviceScreen} options={{
          tabBarIcon: () => (
            <Entypo name="squared-plus" size={24} color={"black"} />
          ),headerShown:false
        }}/>
      <BottomTab.Screen name="board" component={BoardScreen} options={{
          tabBarIcon: () => (
            <Entypo name="blackboard" size={24} color={"black"} />
          ),
        }}/>
      <BottomTab.Screen name="userinfo" component={UserScreen} options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="user" size={24} color={"black"} />
          ),
        }}/>
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;

