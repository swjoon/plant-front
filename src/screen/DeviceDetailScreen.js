import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DeviceDelete, GetDeviceDetail, GetNowData, SettingLed } from "../api/DeviceApi";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const DeviceDetailScreen = ({ route, navigation }) => {
  const [showOptions, setShowOptions] = useState(false);
  const {deviceId} = route.params;
  const [tempV, setTempV] = useState(0);
  const [humidityV, setHumidityV] = useState(0);
  const [shumidityV, setShumidity] = useState(0);
  const [ledV, setLedV] = useState("OFF");
  const [deviceName, setDeviceName] = useState("")
  const [nowLedV, setNowLedV] = useState(0);
  const [nowTempV, setNowTempV] = useState(0);
  const [nowHumidityV, setNowHumidityV] = useState(0);
  const [nowShumidityV, setNowShumidity] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetDeviceDetail(deviceId);
        const nowdata = await GetNowData(deviceId);
        setDeviceName(data.deviceName);
        setTempV(data.tempV);
        setHumidityV(data.humidityV);
        setShumidity(data.shumidityV);
        if (data.ledV == 0) setLedV("OFF");
        else setLedV("ON");
        console.log(nowdata);
        setNowLedV(nowdata.ledV);
        setNowTempV(nowdata.tempV);
        setNowHumidityV(nowdata.humidityV);
        setNowShumidity(nowdata.shumidityV);
      } catch (error) {
        console.error("set data 데이터 불러오기 실패");
      }
    };
    fetchData();
  }, [isFocused]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetNowData(deviceId);
        setNowLedV(data.ledV);
        setNowTempV(data.tempV);
        setNowHumidityV(data.humidityV);
        setNowShumidity(data.shumidityV);
        console.log("data목록: ", data);
      } catch (error) {
        console.log("에러:", error);
      }
    };
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, [isFocused]);

  const Ledbutton = async () => {
    try {
      const data = {
        deviceId: deviceId,
        ledV: ledV,
      };
      if (ledV === "OFF") {
        data.ledV = 1;
      } else {
        data.ledV = 0;
      }
      await SettingLed(data);
      setLedV(ledV === "OFF" ? "ON" : "OFF");
      console.log("성공");
    } catch (error) {
      console.log("조명 조절 실패:", error);
    }
  };
  
  const deleteButton = async (deviceId) => {
    try{
      await DeviceDelete(deviceId);
      navigation.reset({
        index: 0,
        routes: [{ name: "메인화면" }],
      });
    }catch(error){
      console.log("오류")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>{deviceName}</Text>
        <TouchableOpacity
          style={styles.listButton}
          onPress={() => setShowOptions(!showOptions)}
        >
          <AntDesign name="ellipsis1" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.dataItem}></View>
        <View style={styles.dataItem}>
          <Text style={styles.label}>내부 온도</Text>
          <Text style={styles.nowdata}>{nowTempV} ℃</Text>
          <Text style={styles.value}>{tempV} ℃</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.label}>내부 습도</Text>
          <Text style={styles.nowdata}>{nowHumidityV} %</Text>
          <Text style={styles.value}>{humidityV} %</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.label}>토양 수분</Text>
          <Text style={styles.nowdata}>{nowShumidityV} %</Text>
          <Text style={styles.value}>{shumidityV} %</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.label}>조도</Text>
          <Text style={styles.nowdata}>{nowLedV}</Text>
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
          navigation.navigate("Setting", {
            deviceName,
            tempV,
            humidityV,
            shumidityV,
            deviceId,
          })
        }
      >
        <Text style={styles.buttonText}>설정</Text>
      </TouchableOpacity>
      {showOptions && (
        <View style={styles.optionContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={() => deleteButton(deviceId)}>
            <Text>등록 해제</Text>
          </TouchableOpacity>
        </View>
      )}
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
  addButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: "12%",
    marginBottom: "12%",
  },
  backButton: {},
  screenTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  listButton: {},
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
  optionContainer: {
    position: "absolute",
    top: 100,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default DeviceDetailScreen;
