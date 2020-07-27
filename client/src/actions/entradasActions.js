import axios from "axios";
import M from "materialize-css";

import { LOAD_OPCIONES } from '../actions/types';
import { CHANGE_SELECCION } from '../actions/types';
import { LOAD_ENTRADAS } from '../actions/types';
import { DELETE_ENTRADA } from '../actions/types';


export const loadEntradas = (id_sesion) => {
  return async (dispatch) => {
    try {
      console.log(id_sesion);
      const entradas = await axios.get( "/api/admin/listaEntradas?id_sesion=" + id_sesion, { responseType: "json" });
      if(entradas.data){
        dispatch({ type: LOAD_ENTRADAS, payload: entradas.data });
      }else{
        dispatch({ type: LOAD_ENTRADAS, payload: null });
        showError("No hemos encontrado entradas para esta sesion");
      }
    } catch (err) {
      console.log(err);
      showError("Parece que ha habido un problema con la solicitud, vueva a intentarlo.");
    }
  };
}

export const loadOpcionesEntradas = () => {
  return async (dispatch) => {
    try {
      const opciones = await axios.get("/api/admin/listaSesiones");
      if (opciones.data) {
        dispatch({ type: LOAD_OPCIONES, payload: opciones.data.lista_sesiones });
      }else{
        showError("Parece que ha habido un problema con la solicitud, vueva a intentarlo.");
      }
    } catch (err) {
      console.log(err);
      showError("Parece que ha habido un problema con la solicitud, vueva a intentarlo.");
    }
  };
}

export const changeSeleccion = (id_sesion) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_SELECCION, payload: id_sesion });
  };
}

export const deleteEntrada = (id_entrada, index) => {
  return async (dispatch) => {
    try {
      const isDeleted = await axios.post("/api/admin/deleteEntrada", {_id:id_entrada});

      if(isDeleted.data){
        showSucces("La entrada se ha eliminado correctamente");
        dispatch({ type: DELETE_ENTRADA, payload: index });
      }else{
        showError("Ha habido un problema al eliminar la entrada.");
      }
    } catch (err) {
      console.log(err);
      showError("Ha habido un problema al eliminar la entrada.");
    }
  };
}


//TOASTS
export const showError  = (message) => {
  M.Toast.dismissAll();
  setTimeout(function(){
    M.toast({
      html: message+"<p class='hide-on-med-and-up'>&nbsp</p>",
      classes: "right red darken-1",
      displayLength: 5000,
    });
  }, 500);

};
export const showInfo   = (message) => {
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
