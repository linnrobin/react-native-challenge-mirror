import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Tile from "../components/Tile";
import { useSelector, useDispatch } from "react-redux";
import { validateBoard, solveBoard } from "../store/actions";
import Modal from "react-native-modal";

export default function GameScreen({ route, navigation }) {
  const { name, difficulty } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);
  const newBoard = useSelector((state) => state.newBoard);
  const validateStatus = useSelector((state) => state.validateStatus);
  const oriBoard = board.map((arr) => {
    return arr.slice();
  });

  const onValidatePress = () => {
    dispatch(validateBoard({ board: newBoard, difficulty }));
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onModalValidate = () => {
    setIsModalVisible(!isModalVisible);
    if (validateStatus === "solved") {
      navigation.navigate("Finish", { name, difficulty });
    } else {
      Alert.alert("Please Check Again...");
    }
  };

  const onSolvePress = () => {
    dispatch(solveBoard({ board: oriBoard, difficulty }));
  };

  const LoadChecker = () => {
    if (newBoard.length === 0) {
      return <Text>Loading...</Text>;
    } else {
      return (
        <>
          {newBoard.map((tiles, i) => (
            <View style={styles.tiles} key={i}>
              {tiles.map((tile, j) => (
                <Tile tile={tile} key={j} i={i} j={j} difficulty={difficulty} />
              ))}
            </View>
          ))}
          <View style={styles.menu}>
            <View style={styles.button}>
              <Button
                color="black"
                style={styles.spacing}
                title="Validate"
                onPress={onValidatePress}
              />
            </View>
            <View style={styles.button}>
              <Button
                color="red"
                style={styles.spacing}
                title="I Give Up"
                onPress={onSolvePress}
              />
            </View>
          </View>
        </>
      );
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 50,
          }}
        >
          {name}'s board
        </Text>
        <Text style={{ fontSize: 15, margin: 20, color: "red" }}>
          Difficulty: {difficulty}
        </Text>
        <LoadChecker />
        <Modal
          animationIn="slideInUp"
          animationOut="slideOutDown"
          onBackdropPress={() => toggleModal()}
          onSwipeComplete={() => toggleModal()}
          swipeDirection="right"
          isVisible={isModalVisible}
          style={{
            backgroundColor: "white",
            maxHeight: Dimensions.get("window").height / 4,
          }}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ textAlign: "center" }}>Validate The Board?</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              position: "absolute",
              bottom: 0,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ backgroundColor: "black", width: "50%" }}
                onPress={() => onModalValidate()}
              >
                <Text
                  style={{ color: "white", textAlign: "center", padding: 10 }}
                >
                  Ok
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ backgroundColor: "red", width: "50%" }}
                onPress={() => toggleModal()}
              >
                <Text
                  style={{ color: "white", textAlign: "center", padding: 10 }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tiles: {
    flexDirection: "row",
  },
  menu: {
    padding: 50,
    flexDirection: "row",
  },
  button: {
    margin: 10,
  },
});
