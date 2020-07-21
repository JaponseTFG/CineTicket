import axios from "axios";
import { GET_AUTH } from "./types";
import { FETCH_PAYMENT } from "./types";
import { LOGIN_ADMIN } from "./types";

import { GOTO_EDIT_PELICULA } from '../actions/types';
import { GOTO_PELICULAS_LIST } from '../actions/types';
import { DELETE_PELICULA } from '../actions/types';
import { DELETE_IMAGEN_PELICULA } from '../actions/types';
import { SAVE_PELICULA } from '../actions/types';
import { ACTUALIZA_PELICULA } from '../actions/types';
import { LOAD_LISTA_PELICULAS } from '../actions/types';

import { LOAD_LISTA_SALAS } from '../actions/types';
import { LOAD_SALA } from '../actions/types';
import { ACTUALIZA_SALA } from '../actions/types';
import { ACTUALIZA_BUTACAS } from '../actions/types';
import { RESETEA_BUTACAS } from '../actions/types';
import { DELETE_SALA } from '../actions/types';
import { GOTO_LISTA_SALAS } from '../actions/types';

import { LOAD_LISTA_SESIONES } from '../actions/types';
import { LOAD_SESION } from '../actions/types';
import { ACTUALIZA_SESION } from '../actions/types';
import { DELETE_SESION } from '../actions/types';
import { GOTO_LISTA_SESIONES } from '../actions/types';

import { LOAD_CARTELERA } from '../actions/types';
import { TARGET_PELICULA_RESERVA } from '../actions/types';
import { TARGET_SESION_RESERVA } from '../actions/types';
import { TARGET_SESIONES_RESERVA } from '../actions/types';
import { LOAD_SALA_RESERVA } from '../actions/types';
import { TARGET_BUTACA_RESERVA } from '../actions/types';
import { ACTUALIZA_BUTACA_RESERVA } from '../actions/types';
import { SUBMIT_RESERVA } from '../actions/types';


import M from "materialize-css";
//El action creator devolvera una funcion
//thunk vera que devolvemos una funcion y la llamara con el dispatch
//solo cuando la tenga la dispacho

/////Usuarios
export const loadCartelera = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/listaPeliculasCartelera");
      if (res.data) {
        console.log("res",res.data);
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



////ADMIN SESIONES
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



////ADMIN SALAS
export const loadListaSalas = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/admin/listaSalas");
      if (res.data) {
        dispatch({ type: LOAD_LISTA_SALAS, payload: res.data });
      }else{
        showError("Parece que ha habido un problema con la solicitud, vueva a intentarlo.");
      }
    } catch (err) {
      console.log(err);
      showError("Parece que ha habido un problema con la solicitud, vueva a intentarlo.");
    }
  };
}

export const loadSala = (id_sala) => {
  return async (dispatch) => {
    try{
      if(id_sala){
        //Sala existente
        dispatch({ type: LOAD_SALA, payload: null}); //Limpio el estado anterior

        const res = await axios.get("/api/admin/sala?id="+id_sala, {responseType: 'json'});
        const sala = res.data.sala;
        const butacas = res.data.butacas;

        var grid = Array(Number(sala.y_maxima))
        .fill().map((val, index)=>{
          return Array(Number(sala.x_maxima))
          .fill(-1);
        });

        butacas.forEach((item, i) => {
          grid[item.indice_y][item.indice_x] = 1;
        });

        dispatch({ type: LOAD_SALA, payload: {sala : sala, grid: grid}});
      }else{

        dispatch({ type: LOAD_SALA, payload: {nombre:"",x_maxima: 1,y_maxima: 1}});
      }
    }catch(err){
      console.log(err);
      showError("Ha habido un problema al cargar la sala.");
    }
  }
}

export const deleteSala = (id_sala, index) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/admin/deleteSala", {_id:id_sala});
      if(res.data){
        showSucces("La sala se ha eliminado correctamente");
        dispatch({ type: DELETE_SALA, payload: index });
      }else{
        showError("La sala no se puede borrar porque esta siendo utilizada en una sesión.");
      }
    } catch (err) {
      console.log(err);
      showError("Ha habido un problema al eliminar la sala.");
    }
  };
}

export const actualizaSala = (cambio) => {
  return (dispatch) => {
      dispatch({ type: ACTUALIZA_SALA, payload: cambio });
    }
};

export const reseteaButacas = (y_maxima,x_maxima) => {
  var new_grid = Array(Number(y_maxima)).fill().map((val, index)=>{return Array(Number(x_maxima)).fill(1)});
  return (dispatch) => {
      dispatch({ type: RESETEA_BUTACAS, payload: new_grid});
    }
};

export const actualizaButacas = (cambio) => {
  return (dispatch) => {
      dispatch({ type: ACTUALIZA_BUTACAS, payload : cambio });
    }
};

export const saveSala = (sala, butacas) => {
  return async (dispatch) => {
    try {
      if(!sala || !butacas)
        showError("Hay un problema con los datos introducidos, por favor, reviselos.");
      else{
        var butacas_final  = Array();
        var count_columnas = 0;
        var count_asientos = 0;
        console.log("butacas",butacas);
        butacas.forEach((fila, indice_y) => {
          count_columnas = 0;
          fila.forEach((butaca, indice_x) => {
            if(butaca > 0){
              count_columnas++;
              count_asientos++;
              butacas_final.push({indice_y:indice_y, indice_x:indice_x, fila:(indice_y+1), columna:count_columnas, _sala : sala._id});
            }
          });
        });

        sala.n_asientos  = count_asientos;


        const isSalaGuardada = await axios.post("/api/admin/editSala", {sala:sala,butacas:butacas_final});

        if(isSalaGuardada){
          showSucces("La sala se ha guardado correctamente");
          dispatch({ type: GOTO_LISTA_SALAS, payload : true });
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


//Acciones
export const getAuth = () => {
  return async (dispatch) => {
    const res = await axios.get("/api/current_user");
    if (!res.data)
      dispatch({ type: GET_AUTH, payload: false });
    if (res.data.tipo == 1)
      dispatch({ type: GET_AUTH, payload: res.data });
    if (res.data.tipo >1)
      dispatch({ type: GET_AUTH, payload: res.data });
  };
};

export const handleToken = (token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_PAYMENT, payload: { waiting: "procesando" } });
      const test = await axios.post("/api/surveys", {
        emailDestinatario: "javi.btk@gmail.com",
      });
      const res = await axios.post("/api/stripe", token);
      dispatch({ type: FETCH_PAYMENT, payload: { credits: res.data.credits } });
    } catch (err) {
      console.log(err);
      dispatch({ type: FETCH_PAYMENT, payload: {} });
    }
  };
};

export const loginAdmin = (admin_name, admin_pass) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/auth/admin", {username: admin_name, password: admin_pass});
      if (res.data) {
        dispatch({ type: GET_AUTH, payload: res.data });
      }else{
        showError("Error de autentificación. Revise su correo y contraseña.");
      }
    } catch (err) {
      console.log(err);
    }
  };
};


////ADMIN PELICULAS
export const gotoEditPelicula = (index) => {
  return (dispatch) => {
      dispatch({ type: GOTO_EDIT_PELICULA, payload: index });
    }
}

export const savePelicula = (data_pelicula) => {
  return async (dispatch) => {
    try {
      if(data_pelicula == false)
        showError("Ha habido un problema durante el guardado.");
      else{
        const isPeliculaGuardada = await axios.post("/api/admin/editPelicula", data_pelicula);
        if(isPeliculaGuardada){
          showSucces("La pelicula se ha guardado correctamente");
          dispatch({ type: GOTO_PELICULAS_LIST, payload: {isRedirect:true} });
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

export const deletePelicula = (id_pelicula, index) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/admin/deletePelicula", {id:id_pelicula});
      if(res.data){
        showSucces("La pelicula se ha eliminado correctamente");
        dispatch({ type: DELETE_PELICULA, payload: index });
      }else{
        showError("La pelicula no se puede borrar porque esta siendo utilizada en una sesión.");
      }
    } catch (err) {
      console.log(err);
      showError("Ha habido un problema al eliminar la pelicula.");
    }
  };
}

export const deleteImagenPelicula = (id_pelicula) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/admin/deleteImagenPeliculas", id_pelicula);
      showSucces("La imagen se ha eliminado correctamente");
      dispatch({ type: DELETE_IMAGEN_PELICULA, payload: null });
    } catch (err) {
      console.log(err);
      showError("Ha habido un problema al eliminar la imagen.");
    }
  };
}

export const actualizaPelicula = (cambio) => {
  return (dispatch) => {
      dispatch({ type: ACTUALIZA_PELICULA, payload: cambio });
    }
  };

export const loadListaPeliculas = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/admin/listaPeliculas");
      if (res.data) {
        dispatch({ type: LOAD_LISTA_PELICULAS, payload: res.data });
      }else{
        showError("Parece que ha habido un problema con la solicitud, vueva a intentarlo.");
      }
    } catch (err) {
      console.log(err);
      showError("Parece que ha habido un problema con la solicitud, vueva a intentarlo.");
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
  setTimeout(function(){
    M.toast({
      html: message+"<p class='hide-on-med-and-up'>&nbsp</p>",
      classes: "right indigo darken-1",
      displayLength: 5000,
    });
  }, 500);

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
