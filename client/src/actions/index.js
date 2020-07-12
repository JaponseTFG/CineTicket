import axios from "axios";
import { FETCH_USER } from "./types";
import { FETCH_PAYMENT } from "./types";
import { EDIT_PELICULA } from "./types";
import { SUBMIT_PELICULA } from "./types";
import { WAITING_PELICULA } from "./types";
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
    try{
      dispatch({ type: FETCH_PAYMENT, payload: {waiting:"procesando"} });
      const test = await axios.post("/api/surveys", {emailDestinatario:"javi.btk@gmail.com"});
      console.log("test: ",test);
      const res = await axios.post("/api/stripe", token);
      dispatch({ type: FETCH_PAYMENT, payload: {credits:res.data.credits} });
    }catch(err){
      console.log(err);
      dispatch({ type: FETCH_PAYMENT, payload: {} });
    }

  };
};


export const submitPelicula = (dataform) => {
  return async (dispatch) => {
    try{
      dispatch({ type: SUBMIT_PELICULA ,payload: {waiting:true} });
      const pelicula = await axios.post("/api/submitPelicula", dataform);
      dispatch({ type: SUBMIT_PELICULA ,payload: {pelicula:pelicula} });
    }catch(err){
      console.log(err);
      dispatch({ type: SUBMIT_PELICULA, payload: {pelicula:null} });
    }
  };
};
