import { LOAD_LISTA_SESIONES } from '../actions/types';
import { LOAD_SESION } from '../actions/types';
import { ACTUALIZA_SESION } from '../actions/types';
import { DELETE_SESION } from '../actions/types';
import { GOTO_LISTA_SESIONES } from '../actions/types';

const defaultState = {lista_sesiones: null,opciones: null, sesion : {fecha:null,_pelicula:null,_sala:null}, isRedirect:false};

export default function (state = defaultState, action) {
  switch (action.type)
  {
    case LOAD_LISTA_SESIONES:
      return {...state, opciones: action.payload.opciones, lista_sesiones : action.payload.lista_sesiones};
    case LOAD_SESION:
      if(action.payload != null )
        return {...state, sesion : state.lista_sesiones[action.payload], isRedirect:false};
      else
        return {...state, sesion : {fecha:null,_pelicula:false,_sala:false}, isRedirect:false};
    case ACTUALIZA_SESION:
      return {...state, sesion : {...state.sesion,...action.payload}};
    case DELETE_SESION:
      var new_lista_sesiones = [...state.lista_sesiones];
      new_lista_sesiones.splice(action.payload, 1);
      return  {...state, lista_sesiones : new_lista_sesiones};
    case GOTO_LISTA_SESIONES:
      return {isRedirect:true};
    default:
      return state;
  }
}
