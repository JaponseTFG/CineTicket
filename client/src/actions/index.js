import axios from "axios";
import { FETCH_USER } from "./types";
import { FETCH_PAYMENT } from "./types";

//El action creator devolvera una funcion
//thunk vera que devolvemos una funcion y la llamara con el dispatch
//solo cuando la tenga la dispacho

export const fetchUser = () => {
  return async (dispatch) => {
    const res = await axios.get("/api/current_user");
    dispatch({ type: FETCH_USER, payload: res.data });
  };
};

export const handleToken = (token) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_PAYMENT, payload: false });    
    const res = await axios.post("/api/stripe", token);
    dispatch({ type: FETCH_PAYMENT, payload: res.data });
  };
};
