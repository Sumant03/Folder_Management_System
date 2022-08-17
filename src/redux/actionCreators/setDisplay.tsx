import * as types from "../actionTypes/actionTypes";

export const setDisplayVal = (payload: number) => {
  return {
    type: types.SET_DISPLAY,
    payload
  };
};