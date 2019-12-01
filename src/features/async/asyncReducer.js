import { createReducer } from "../../app/common/util/reducerUtil";
import {
  ASYNC_ACTION_ERROR,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_START
} from "./asyncConstants";

const initialState = {
  loading: false
};

export const asyncActionStarted = state => {
  //it has been more of a habit to always add the payload even if we will not be needing it, but here we will be removing it though

  return { ...state, loading: true };
};

export const asyncActionFinished = state => {
  return { ...state, loading: false };
};

export const asyncActionError = state => {
  return { ...state, loading: false };
};


export default createReducer(initialState, {
[ASYNC_ACTION_START]: asyncActionStarted,
[ASYNC_ACTION_FINISH]: asyncActionFinished,
[ASYNC_ACTION_ERROR]: asyncActionError
});