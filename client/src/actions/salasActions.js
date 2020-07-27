import axios from "axios";
import M from "materialize-css";

import { LOAD_LISTA_SALAS } from '../actions/types';
import { LOAD_SALA } from '../actions/types';
import { ACTUALIZA_SALA } from '../actions/types';
import { ACTUALIZA_BUTACAS } from '../actions/types';
import { RESETEA_BUTACAS } from '../actions/types';
import { DELETE_SALA } from '../actions/types';
import { GOTO_LISTA_SALAS } from '../actions/types';


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
