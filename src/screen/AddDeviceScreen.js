import { useEffect, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { DeviceSignup } from "../api/DeviceApi";

const AddDeviceScreen = ({ navigation }) => {
  const [deviceId, setDeviceId] = useState(null);
  const [devicePw, setDevicePw] = useState(null);

  useEffect(() => {
    setDeviceId(null);
    setDevicePw(null);
  }, []);

  const handleSignup = async() => {
    try {
      const deviceData = {
        deviceId: deviceId,
        devicePw: devicePw,
      };

      const response = await DeviceSignup(deviceData);

      if (response.status === 200) {
        console.log("device 정상 등록");
        setDeviceId(null);
        setDevicePw(null);
        navigation.reset({
          index: 0,
          routes: [{ name: "메인화면" }],
        });
      } else {
        setDeviceId(null);
        setDevicePw(null);
        console.error("device 등록 실패 ");
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>DeviceID</Text>
        <TextInput
          style={styles.input}
          value={deviceId}
          placeholder="ID를 입력하세요"
          onChangeText={(text) => setDeviceId(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>DevicePW</Text>
        <TextInput
          style={styles.input}
          value={devicePw}
          placeholder="PW를 입력하세요"
          onChangeText={(text) => setDevicePw(text)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>등록</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  inputContainer: {
    marginBottom: 10,
    width: "100%",
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: "#ddd",
    width: "100%",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  dateButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
});
export default AddDeviceScreen;
