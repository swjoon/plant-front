import { GetDeviceList } from "../api/DeviceApi";

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

const MainScreen = ({ navigation }) => {
  const [deviceList, setDeviceList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetDeviceList();
        setDeviceList(data);
        console.log(deviceList);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  // 상세페이지
  const navigateToDeviceDetail = ({ deviceId, deviceName }) => {
    navigation.navigate("deviceInfo", { deviceId, deviceName });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={deviceList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.deviceItem}
            onPress={() =>  
              navigateToDeviceDetail({
                deviceId: item.device.deviceId,
                deviceName: item.deviceName,
              })
            }
          >
            <View style={styles.leftContainer}>
              <Image
                source={require("/front-end/app/assets/plant.png")}
                style={styles.plantIcon}
              />
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.deviceName}>{item.device.deviceId}</Text>
              <Text style={styles.deviceDescription}>{item.deviceName}</Text>
              {/* 필요한 정보를 표시 */}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  deviceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  leftContainer: {
    marginRight: 10,
  },
  rightContainer: {
    flex: 1,
  },
  plantIcon: {
    width: 50,
    height: 50,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  deviceDescription: {
    fontSize: 14,
  },
});

export default MainScreen;
