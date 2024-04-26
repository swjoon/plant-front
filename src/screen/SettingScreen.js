import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

const SettingScreen = ({ navigation, route }) => {
  const { tempV, humidityV, shumidityV } = route.params;

  const [cTempV, setcTempV] = useState(tempV);
  const [cHumidityV, setcHumidityV] = useState(humidityV);
  const [cShumidityV, setcShumidity] = useState(shumidityV);

    const updateSetting= () => {
        const data = {
            tempV: cTempV,
            humidityV: cHumidityV,
            shumidityV: cShumidityV
        }

        console.log(data);

        navigation.goBack();
    } 

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <View style={styles.dataItem} />
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
              onChangeText={(text) => setcTempV(text)}
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
              onChangeText={(text) => setcTempV(text)}
            >
              {shumidityV}
            </TextInput>
            <Text style={styles.textstyle}>%</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={updateSetting}
      >
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
