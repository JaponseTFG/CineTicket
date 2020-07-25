import { LOAD_OPCIONES } from '../actions/types';
import { CHANGE_SELECCION } from '../actions/types';
import { LOAD_ENTRADAS } from '../actions/types';
import { DELETE_ENTRADA } from '../actions/types';

const defaultState = { lista_entradas : null, opciones : null, selected : null};

export default function (state = defaultState, action) {

  switch (action.type)
  {
    case LOAD_OPCIONES:
      return {...state, opciones : action.payload, selected : action.payload[0]._id};
    case CHANGE_SELECCION:
      return {...state, selected : action.payload};
    case LOAD_ENTRADAS:
      return {...state, lista_entradas : action.payload};
    case DELETE_ENTRADA:
      var new_lista_entradas = [...state.lista_entradas];
      new_lista_entradas.splice(action.payload, 1);
      return  {...state, lista_entradas : new_lista_entradas};
    default:
      return state;
  }
}
