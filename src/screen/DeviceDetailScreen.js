import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { GetDeviceDetail } from "../api/DeviceApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";

const DeviceDetailScreen = ({ route, navigation }) => {
  const { deviceId, deviceName } = route.params;
  console.log(deviceId, deviceName);
  const [tempV, setTempV] = useState(0);
  const [humidityV, setHumidityV] = useState(0);
  const [shumidityV, setShumidity] = useState(0);
  const [ledV, setLedV] = useState("");

  useEffect(() => {
    const fetchData = async (deviceId) => {
      try {
        const data = await GetDeviceDetail(deviceId);
        setTempV(data.tempV);
        setHumidityV(data.humidityV);
        setShumidity(data.shumidityV);
        if (data.ledV == 0) setLedV("OFF");
        else setLedV("ON");

        console.log(tempV, humidityV, shumidityV, ledV);
      } catch (error) {
        console.error("set data 데이터 불러오기 실패");
      }
    };
    fetchData(deviceId);
  }, []);

  const Ledbutton = () => {
    if (ledV == "OFF") {
      setLedV("ON");
    } else setLedV("OFF");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{deviceName}</Text>
      <View style={styles.dataContainer}>
        <View style={styles.dataItem}></View>
        <View style={styles.dataItem}>
          <Text style={styles.label}>내부 온도</Text>
          <Text style={styles.nowdata}>현재</Text>
          <Text style={styles.value}>{tempV} ℃</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.label}>내부 습도</Text>
          <Text style={styles.nowdata}>현재</Text>
          <Text style={styles.value}>{humidityV} %</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.label}>토양 수분</Text>
          <Text style={styles.nowdata}>현재</Text>
          <Text style={styles.value}>{shumidityV} %</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.label}>조도</Text>
          <Text style={styles.nowdata}>현재</Text>
          <View style={styles.value}>
            <TouchableOpacity style={styles.dataButton} onPress={Ledbutton}>
              <Text style={styles.buttonText}>{ledV}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Setting", { tempV, humidityV, shumidityV })
        }
      >
        <Text style={styles.buttonText}>설정</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
  dataContainer: {
    marginTop: 40,
    width: "100%",
  },
  dataItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  nowdata: {
    textAlign: "center",
  },
  label: {
    width: "33%",
    fontSize: 16,
    color: "#333",
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    textAlign: "center",
  },
  value: {
    textAlign: "center",
    width: "33%",
    fontSize: 16,
    fontWeight: "bold",
    borderLeftWidth: 1,
    borderLeftColor: "#ddd",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    bottom: 30,
    width: "40%",
    padding: 15,
    backgroundColor: "#007AFF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  dataButton: {
    backgroundColor: "#007AFF",
    width: "50%",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default DeviceDetailScreen;
