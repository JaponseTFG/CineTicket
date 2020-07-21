import { GOTO_EDIT_PELICULA } from '../actions/types';
import { GOTO_PELICULAS_LIST } from '../actions/types';
import { DELETE_PELICULA } from '../actions/types';
import { DELETE_IMAGEN_PELICULA } from '../actions/types';
import { ACTUALIZA_PELICULA } from '../actions/types';
import { LOAD_LISTA_PELICULAS } from '../actions/types';

const defaultState = {lista_peliculas: null, pelicula:null, isRedirect:false};

export default function (state = defaultState, action) {

  switch (action.type)
  {
    case GOTO_EDIT_PELICULA:
      return {pelicula : state.lista_peliculas[action.payload], isRedirect:false};
    case GOTO_PELICULAS_LIST:
      return {isRedirect : action.payload.isRedirect};
    case DELETE_PELICULA:
      var new_lista_peliculas = [...state.lista_peliculas];
      new_lista_peliculas.splice(action.payload, 1);
      return  {lista_peliculas : new_lista_peliculas};
    case DELETE_IMAGEN_PELICULA:
      return {pelicula : {...state.pelicula,...action.payload}};
    case ACTUALIZA_PELICULA:
      return {pelicula : {...state.pelicula,...action.payload}};
    case LOAD_LISTA_PELICULAS:
      return {lista_peliculas : action.payload};
    default:
      return state;
  }
}
