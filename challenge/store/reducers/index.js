import {
  SET_BOARD,
  SET_NEW_BOARD,
  SET_VALIDATE_STATUS,
  SET_SOLVED,
} from "../actions";

const initialState = {
  board: [],
  newBoard: [],
  valitadeStatus: "",
  solved: [],
};

function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_BOARD:
      return { ...state, board: payload };
    case SET_NEW_BOARD:
      return { ...state, newBoard: payload };
    case SET_VALIDATE_STATUS:
      return { ...state, validateStatus: payload };
    case SET_SOLVED:
      return { ...state, solved: payload };
    default:
      break;
  }
  return state;
}
export default reducer;
