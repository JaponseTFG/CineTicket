import { LOAD_LISTA_SALAS } from '../actions/types';
import { LOAD_SALA } from '../actions/types';
import { ACTUALIZA_SALA } from '../actions/types';
import { ACTUALIZA_BUTACAS } from '../actions/types';
import { RESETEA_BUTACAS } from '../actions/types';
import { DELETE_SALA } from '../actions/types';
import { GOTO_LISTA_SALAS } from '../actions/types';

const defaultState = {lista_salas: null, sala: {nombre:"",x_maxima:1,y_maxima:1}, butacas:null, existentGrid:false, isRedirect:false};

export default function (state = defaultState, action) {
  switch (action.type)
  {
    case LOAD_LISTA_SALAS:
      return {...state, lista_salas : action.payload};
    case LOAD_SALA:
      if(action.payload && action.payload.grid)
        return {...state, existentGrid: action.payload.grid, butacas: action.payload.grid, sala : action.payload.sala, isRedirect:false};
      else
        return {...state, existentGrid: false, sala : action.payload , isRedirect:false};
    case ACTUALIZA_SALA:
      return {...state, sala : {...state.sala,...action.payload}};
    case ACTUALIZA_BUTACAS:
      var new_butacas = [...state.butacas];
      new_butacas[action.payload.y][action.payload.x] = action.payload.valor;
      return {...state, butacas : new_butacas}
    case RESETEA_BUTACAS:
      return {...state, existentGrid: action.payload, butacas: action.payload }
    case DELETE_SALA:
      var new_lista_salas = [...state.lista_salas];
      new_lista_salas.splice(action.payload, 1);
      return  {...state, lista_salas : new_lista_salas};
    case GOTO_LISTA_SALAS:
      return {isRedirect:true};
    default:
      return state;
  }
}
