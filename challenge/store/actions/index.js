import axios from "axios";

export const SET_BOARD = "SET_BOARD";
export const SET_NEW_BOARD = "SET_NEW_BOARD";
export const SET_VALIDATE_STATUS = "SET_VALIDATE_STATUS";
export const SET_SOLVED = "SET_SOLVED";

export const setBoard = (data) => {
  return { type: SET_BOARD, payload: data };
};

export const setNewBoard = (data) => {
  return { type: SET_NEW_BOARD, payload: data };
};

export const setValidateStatus = (data) => {
  return { type: SET_VALIDATE_STATUS, payload: data };
};

export const setSolved = (data) => {
  return { type: SET_SOLVED, payload: data };
};
export const fetchBoard = ({ board, difficulty }) => {
  return (dispatch) => {
    if (board.length !== 0) {
      dispatch(setBoard(board));
    } else {
      axios
        .get(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
        .then(({ data }) => {
          const board2 = data.board.map((arr) => {
            return arr.slice();
          });
          dispatch(setBoard(data.board));
          dispatch(setNewBoard(board2));
        })
        .catch((err) => console.log(err));
    }
  };
};

export const validateBoard = ({ board, difficulty }) => {
  const encodeBoard = (board) =>
    board.reduce(
      (result, row, i) =>
        result +
        `%5B${encodeURIComponent(row)}%5D${
          i === board.length - 1 ? "" : "%2C"
        }`,
      ""
    );

  const encodeParams = (params) =>
    Object.keys(params)
      .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
      .join("&");

  return (dispatch) => {
    axios
      .post("https://sugoku.herokuapp.com/validate", encodeParams({ board }), {
        "Content-Type": "application/x-www-form-urlencoded",
      })
      .then((response) => {
        dispatch(setValidateStatus(response.data.status));
      })
      .catch((err) => console.log(err));
  };
};

export const solveBoard = ({ board, difficulty }) => {
  const encodeBoard = (board) =>
    board.reduce(
      (result, row, i) =>
        result +
        `%5B${encodeURIComponent(row)}%5D${
          i === board.length - 1 ? "" : "%2C"
        }`,
      ""
    );

  const encodeParams = (params) =>
    Object.keys(params)
      .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
      .join("&");

  return (dispatch) => {
    axios
      .post("https://sugoku.herokuapp.com/solve", encodeParams({ board }), {
        "Content-Type": "application/x-www-form-urlencoded",
      })
      .then((response) => {
        return dispatch(setSolved(response.data.solution));
      })
      .then(({ payload }) => {
        dispatch(fetchBoard({ board: payload, difficulty }));
        dispatch(setNewBoard(payload));
      })
      .catch((err) => console.log("ini err", err));
  };
};
