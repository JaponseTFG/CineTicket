import axios from "axios";
import M from "materialize-css";

import { LOAD_INFO_ENTRADA } from '../actions/types';
import { TARGET_ENTRADA } from '../actions/types';
import { VALIDA_ENTRADA } from '../actions/types';


export const loadEntrada = (id_entrada) => {
  return async (dispatch) => {
    try {
      const entrada = await axios.get( "/api/admin/findEntrada?id_entrada=" + id_entrada, { responseType: "json" });
      if(entrada.data){
        dispatch({ type: LOAD_INFO_ENTRADA, payload: entrada.data });
      }else{
        dispatch({ type: LOAD_INFO_ENTRADA, payload: null });
        showError("Entrada no válida");
      }
    } catch (err) {
      console.log(err);
      showError("Parece que ha habido un problema con la solicitud, vueva a intentarlo.");
    }
  };
}

export const validaEntrada = (id_entrada) => {
  console.log(id_entrada);
  return async (dispatch) => {
    try {
      const isValidada = await axios.post( "/api/admin/validaEntrada",{_id:id_entrada});
      if(isValidada.data){
        dispatch({ type: LOAD_INFO_ENTRADA, payload: null });
        showSucces("Entrada validada correctamente");
      }else{
        dispatch({ type: LOAD_INFO_ENTRADA, payload: null });
        showError("Entrada no válida");
      }
    } catch (err) {
      console.log(err);
      showError("Parece que ha habido un problema con la solicitud, vueva a intentarlo.");
    }
  };
}

export const targetEntrada = (id_entrada) => {
  return (dispatch) => {
    dispatch({ type: TARGET_ENTRADA, payload: id_entrada });
  };
}

//Toasts
export const showError = (message) => {
  M.Toast.dismissAll();
  setTimeout(function(){
    M.toast({
      html: message+"<p class='hide-on-med-and-up'>&nbsp</p>",
      classes: "right red darken-1",
      displayLength: 5000,
    });
  }, 500);

};

export const showInfo = (message) => {
  M.Toast.dismissAll();

  M.toast({
    html: message+"<p class='hide-on-med-and-up'>&nbsp</p>",
    classes: "right teal lighten-1",
    displayLength: 2000,
  });


};

export const showSucces = (message) => {
  M.Toast.dismissAll();
  setTimeout(function(){
    M.toast({
    html: message+"<p class='hide-on-med-and-up'>&nbsp</p>",
    classes: "right blue-grey darken-1",
    displayLength: 2000,
  });
}, 500);
};
