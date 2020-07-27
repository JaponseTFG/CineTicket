import axios from "axios";
import M from "materialize-css";

import { LOAD_LISTA_SESIONES } from '../actions/types';
import { LOAD_SESION } from '../actions/types';
import { ACTUALIZA_SESION } from '../actions/types';
import { DELETE_SESION } from '../actions/types';
import { GOTO_LISTA_SESIONES } from '../actions/types';


export const loadListaSesiones = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/admin/listaSesiones");
      if (res.data) {
        dispatch({ type: LOAD_LISTA_SESIONES, payload: {lista_sesiones : res.data.lista_sesiones, opciones : res.data.opciones} });
      }else{
        showError("Parece que ha habido un problema con la solicitud, vueva a intentarlo.");
      }
    } catch (err) {
      console.log(err);
      showError("Parece que ha habido un problema con la solicitud, vueva a intentarlo.");
    }
  };
}

export const loadSesion = (index) => {
  return async (dispatch) => {
    try{
      if(index!=null){
        dispatch({ type: LOAD_SESION, payload: index}); //Limpio el estado anterior
      }else{
        dispatch({ type: LOAD_SESION, payload: null});
      }
    }catch(err){
      console.log(err);
      showError("Ha habido un problema al cargar la sesion.");
    }
  }
}

export const deleteSesion = (id_sesion, index) => {
  return async (dispatch) => {
    try {
      const isDeleted = await axios.post("/api/admin/deleteSesion", {_id:id_sesion});

      if(isDeleted.data){
        showSucces("La sesión se ha eliminado correctamente");
        dispatch({ type: DELETE_SESION, payload: index });
      }else{
        showError("Ha habido un problema al eliminar la session.");
      }
    } catch (err) {
      console.log(err);
      showError("Ha habido un problema al eliminar la sesion.");
    }
  };
}

export const actualizaSesion = (cambio) => {
  return (dispatch) => {
      dispatch({ type: ACTUALIZA_SESION, payload: cambio });
    }
};

export const saveSesion = (sesion) => {
  return async (dispatch) => {
    try {
      if(!sesion)
        showError("Hay un problema con los datos introducidos, por favor, reviselos.");
      else{
        console.log("FECHA",sesion.fecha);
        var isSesionGuardada = await axios.post("/api/admin/editSesion", {sesion:sesion});

        if(isSesionGuardada.data){
          showSucces("La sesión se ha guardado correctamente");
          dispatch({ type: GOTO_LISTA_SESIONES, payload : true });
        }else{
          showError("Ha habido un problema durante el guardado.");
        }
      }
    } catch (err) {
      console.log(err);
      showError("Ha habido un problema durante el guardado.");
    }
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
