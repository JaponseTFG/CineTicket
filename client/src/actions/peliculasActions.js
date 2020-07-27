import axios from "axios";
import M from "materialize-css";

import { GOTO_EDIT_PELICULA } from '../actions/types';
import { GOTO_PELICULAS_LIST } from '../actions/types';
import { DELETE_PELICULA } from '../actions/types';
import { DELETE_IMAGEN_PELICULA } from '../actions/types';
import { SAVE_PELICULA } from '../actions/types';
import { ACTUALIZA_PELICULA } from '../actions/types';
import { LOAD_LISTA_PELICULAS } from '../actions/types';


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
