import axios from "axios";
import M from "materialize-css";

import { LOAD_CARTELERA } from '../actions/types';
import { TARGET_PELICULA_RESERVA } from '../actions/types';
import { TARGET_SESION_RESERVA } from '../actions/types';
import { TARGET_SESIONES_RESERVA } from '../actions/types';
import { LOAD_SALA_RESERVA } from '../actions/types';
import { TARGET_BUTACA_RESERVA } from '../actions/types';
import { ACTUALIZA_BUTACA_RESERVA } from '../actions/types';
import { SUBMIT_RESERVA } from '../actions/types';


export const loadCartelera = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/listaPeliculasCartelera");
      if (res.data) {
        dispatch({ type: LOAD_CARTELERA, payload: res.data });
      }else{
        showError("Parece que ha habido un problema con la solicitud, vueva a intentarlo.");
      }
    } catch (err) {
      console.log(err);
      showError("Parece que ha habido un problema con la solicitud, vueva a intentarlo.");
    }
  };
}

export const targetPelicula = (index) => {
  return (dispatch) => {
    dispatch({ type: TARGET_PELICULA_RESERVA, payload: index });
  };
}

export const targetSesion = (index) => {
  return (dispatch) => {
    dispatch({ type: TARGET_SESION_RESERVA, payload: index });
  };
}

export const targetSesiones = (fecha, id_pelicula) => {
  return async (dispatch) => {
    try {
      let sesiones = await axios.get( "/api/sesionesUndia?id_pelicula=" + id_pelicula + "&dia=" + fecha, { responseType: "json" });
      if (sesiones.data) {
        if(sesiones.data.length < 1)
          showInfo("No hay sesiones en la fecha especificada, pruebe con otro dia.");
        dispatch({ type: TARGET_SESIONES_RESERVA, payload: sesiones.data });
      }else{
        showError("Parece que ha habido un problema con la solicitud, vueva a intentarlo.");
      }
    } catch (err) {
      console.log(err);
      showError("Parece que ha habido un problema con la solicitud, vueva a intentarlo.");
    }
  };
}

export const loadSalaReserva = (id_sesion) => {
  return async (dispatch) => {
    try{
      const res = await axios.get("/api/butacasSesion?id="+id_sesion, {responseType: 'json'});
      console.log(res);
      if(res.data){
        dispatch({ type: LOAD_SALA_RESERVA, payload: res.data });
      }else{
        dispatch({ type: LOAD_SALA_RESERVA, payload: false });
        showError("Parece que ha habido un problema con la solicitud, vueva a intentarlo.");
      }
    }catch(err){
      console.log(err);
      showError("Parece que ha habido un problema con la solicitud, vueva a intentarlo.");
    }

  };
}

export const targetButaca = (id_butaca, index) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ACTUALIZA_BUTACA_RESERVA, payload: {estado : "comprobando", index : index} });
      const res = await axios.post("/api/targetButaca", { _id : id_butaca });
      if(res.data){
        if(res.data.success){
          dispatch({ type: ACTUALIZA_BUTACA_RESERVA, payload: {estado : res.data.estado, index : index} });
        }else{
          showError("El número máximo de butacas reservadas es de 6. Si desea más entradas debe procesar sus reservas.");
          dispatch({ type: ACTUALIZA_BUTACA_RESERVA, payload: {estado : res.data.estado, index : index} });
        }
      }else{
        showError("Parece que ha habido un problema con la solicitud, vueva a intentarlo.");
      }
    } catch (err) {
      console.log(err);
      showError("Parece que ha habido un problema con la solicitud, vueva a intentarlo.");
    }
  };
}

export const handleTokenStripe = (token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SUBMIT_RESERVA, payload: "procesandose" });
      const res = await axios.post("/api/stripe", token);
      if(res.data){
        dispatch({ type: SUBMIT_RESERVA, payload: res.data });
      }
      else{
        dispatch({ type: SUBMIT_RESERVA, payload: null });
        showError("Ha habido un problema durante el pago. Vuelva a intentarlo tras unos minutos.");
      }
    } catch (err) {
      console.log(err);
      showError("Ha habido un problema durante el pago. Vuelva a intentarlo tras unos minutos.");
    }
  };
};


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
