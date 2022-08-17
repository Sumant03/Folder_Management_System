import * as types from "../actionTypes/actionTypes";

const initilState = 1;

const setDisplayVal = (state = initilState, action: any) => {
  switch (action.type) {
    case types.SET_DISPLAY:
      return action.payload;
    default:
      return state;
  }
};

export default setDisplayVal;