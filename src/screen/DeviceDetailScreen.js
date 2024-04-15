import React, { useState } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";

const DeviceDetailScreen = ({ route, navigation }) => {
  const { deviceId, deviceName } = route.params;
  console.log(deviceId  , deviceName)
  const [setData, setSetData] = useState([]);
  // 화면에 deviceId와 deviceName을 표시하거나 다른 작업 수행

  const renderSetDataItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.label}>LED Voltage:</Text>
      <Text style={styles.value}>{item.ledV}</Text>
      {/* 기타 필요한 정보도 동일한 방식으로 표시 */}
    </View>
  );


  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Device Detail</Text> */}
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.label}>Device ID:</Text>
          <Text style={styles.value}>{deviceId}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Device Name:</Text>
          <Text style={styles.value}>{deviceName}</Text>
        </View>
      </View>
      {/* <Text style={styles.header}>Set Data</Text> */}
      <FlatList
        data={setData}
        renderItem={renderSetDataItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button
        title="설정"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
    },
    info: {
      marginBottom: 20,
    },
    row: {
      flexDirection: "row",
      marginBottom: 5,
      alignItems: "center", // 아이템이 세로로 중앙 정렬되도록 추가
    },
    label: {
      fontWeight: "bold",
      marginRight: 5,
    },
    value: {
    },
  });

export default DeviceDetailScreen;
