import React, { useState } from "react";
import { View, TextInput, Button, Text, Picker, Alert } from "react-native";
import { useDispatch } from "react-redux";
import {
  setNewBoard,
  setValidateStatus,
  setSolved,
  fetchBoard,
} from "../store/actions";

export default function HomeScreen({ navigation }) {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const dispatch = useDispatch();
  const onPressHandle = () => {
    if (name.length !== 0) {
      dispatch(fetchBoard({ board: [], difficulty }));
      navigation.navigate("Game", { name, difficulty });
      dispatch(setNewBoard([]));
      dispatch(setValidateStatus(""));
      dispatch(setSolved([]));
      setName("");
      setDifficulty("easy");
    } else {
      Alert.alert("Please Input Nickname...");
    }
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>SUDOKU</Text>
      <TextInput
        style={{
          height: 50,
          width: "50%",
          padding: 10,
          marginTop: 100,
          marginBottom: 20,
          backgroundColor: "black",
          color: "white",
        }}
        placeholder="Nickname"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <Picker
        selectedValue={difficulty}
        style={{
          backgroundColor: "white",
          height: 50,
          width: "50%",
          padding: 10,
        }}
        onValueChange={(itemValue, itemIndex) => setDifficulty(itemValue)}
      >
        <Picker.Item label="Easy" value="easy" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Hard" value="hard" />
        <Picker.Item label="Random" value="random" />
      </Picker>
      <View style={{ padding: 30 }}>
        <Button color="black" title="Play Now " onPress={onPressHandle} />
      </View>
    </View>
  );
}
