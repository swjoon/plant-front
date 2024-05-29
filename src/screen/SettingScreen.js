import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SettingData } from "../api/DeviceApi";
import { AntDesign } from "@expo/vector-icons";

const SettingScreen = ({ navigation, route }) => {
  const { deviceName, tempV, humidityV, shumidityV, deviceId } = route.params;
  const [cDeviceName, setDeviceName] = useState(deviceName);
  const [cTempV, setcTempV] = useState(tempV);
  const [cHumidityV, setcHumidityV] = useState(humidityV);
  const [cShumidityV, setcShumidity] = useState(shumidityV);

  const updateSetting = async () => {
    const data = {
      deviceId: deviceId,
      deviceName: cDeviceName,
      ledV: 0,
      tempV: cTempV,
      humidityV: cHumidityV,
      shumidityV: cShumidityV,
    };
    console.log(data);
    await SettingData(data);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setDeviceName(text)}
        >
          {deviceName}
        </TextInput>
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.dataItem}>
          <Text style={styles.label}>내부 온도</Text>
          <View style={styles.setContainer}>
            <TextInput
              style={styles.value}
              onChangeText={(text) => setcTempV(text)}
            >
              {tempV}
            </TextInput>
            <Text style={styles.textstyle}>℃</Text>
          </View>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.label}>내부 습도</Text>
          <View style={styles.setContainer}>
            <TextInput
              style={styles.value}
              onChangeText={(text) => setcHumidityV(text)}
            >
              {humidityV}
            </TextInput>
            <Text style={styles.textstyle}>%</Text>
          </View>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.label}>토양 수분</Text>
          <View style={styles.setContainer}>
            <TextInput
              style={styles.value}
              onChangeText={(text) => setcShumidity(text)}
            >
              {shumidityV}
            </TextInput>
            <Text style={styles.textstyle}>%</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={updateSetting}>
        <Text style={styles.buttonText}>확인</Text>
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
  addButtonContainer: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    marginTop: "30%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    fontSize: 16,
    borderWidth: 1,
  },
  screenTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
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
    width: "50%",
    fontSize: 16,
    color: "#333",
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    textAlign: "center",
  },
  value: {
    textAlign: "center",
    width: "50%",
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
  setContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  textstyle: {
    fontSize: 16,
    fontWeight: "bold",
    width: "50%",
  },
});

export default SettingScreen;
