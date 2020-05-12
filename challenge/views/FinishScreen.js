import React from "react";
import { View, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import { fetchBoard, setNewBoard, setValidateStatus } from "../store/actions";

export default function FinishScreen({ route, navigation }) {
  const { name, difficulty } = route.params;
  const dispatch = useDispatch();

  function onPressPlayAgain() {
    dispatch(fetchBoard({ board: [], difficulty }));
    dispatch(setNewBoard([]));
    dispatch(setValidateStatus(""));
    navigation.navigate("Game", { name, difficulty });
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", padding: 20 }}>
        CONGRATULATIONS!!!
      </Text>

      <Text
        style={{ padding: 20, color: "red", fontSize: 40, fontWeight: "bold" }}
      >
        {name}
      </Text>
      <Text style={{ fontSize: 20, fontWeight: "bold", padding: 30 }}>
        YOU HAVE BEATEN THE
      </Text>
      <Text style={{ margin: 20, fontSize: 40, fontWeight: "bold" }}>
        SUDOKU
      </Text>
      <Button color="red" title="Play again" onPress={onPressPlayAgain} />

      <View style={{ padding: 20 }}>
        <Button
          color="black"
          title="Back to Home"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </View>
  );
}
