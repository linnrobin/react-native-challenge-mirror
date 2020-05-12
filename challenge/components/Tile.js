import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setNewBoard } from "../store/actions";

export default function Tile(content) {
  const [value, onChangeText] = useState("");
  const { tile, i, j } = content;
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);
  const newBoard = useSelector((state) => state.newBoard);
  const tempBoard = newBoard.map((arr) => {
    return arr.slice();
  });

  const handleOnChangeText = (text) => {
    if (text !== "" && text !== "." && text >= 1) {
      onChangeText(text);
      tempBoard[i][j] = +text;
      dispatch(setNewBoard(tempBoard));
    }
  };

  const EmptyCheck = () => {
    if (tile !== 0 && board[i][j] !== 0) {
      return <Text style={styles.content}>{tile}</Text>;
    } else if (tile !== 0 && board[i][j] === 0) {
      return (
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => handleOnChangeText(text)}
          defaultValue={tile.toString()}
          keyboardType="number-pad"
        ></TextInput>
      );
    } else {
      return (
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => handleOnChangeText(text)}
          value={value}
          keyboardType="number-pad"
        ></TextInput>
      );
    }
  };

  return (
    <View style={styles.tile}>
      <EmptyCheck />
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderWidth: 1,
    width: "10%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderColor: "white",
  },
  content: {
    color: "red",
  },
  textInput: {
    textAlign: "center",
    color: "white",
  },
});
