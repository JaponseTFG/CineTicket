import { LOAD_CARTELERA } from '../actions/types';
import { TARGET_PELICULA_RESERVA } from '../actions/types';
import { TARGET_SESION_RESERVA } from '../actions/types';
import { TARGET_SESIONES_RESERVA } from '../actions/types';
import { LOAD_SALA_RESERVA } from '../actions/types';
import { TARGET_BUTACA_RESERVA } from '../actions/types';
import { ACTUALIZA_BUTACA_RESERVA } from '../actions/types';
import { SUBMIT_RESERVA } from '../actions/types';


const defaultState = {
  cartelera: null,
  pelicula: null,
  sesiones: null,
  sesion: null,
  butacas: null,
  butacas_actualizadas : null,
  isRedirect: false,
  sala: false,
  checkout: null,
  isSuccess: null,
};

export default function (state = defaultState, action) {

  switch (action.type)
  {
    case LOAD_CARTELERA:
      return {...state, cartelera : action.payload};
    case TARGET_PELICULA_RESERVA:
      return {...state, pelicula : state.cartelera[action.payload], sesiones:null};
    case TARGET_SESIONES_RESERVA:
      return {...state, sesiones : action.payload};
    case TARGET_SESION_RESERVA:
      return {...state, butacas : null, sesion : state.sesiones[action.payload]};
    case LOAD_SALA_RESERVA:
      return {...state, butacas : action.payload, butacas_actualizadas : action.payload,  isSuccess : null};
    case ACTUALIZA_BUTACA_RESERVA:
      var new_butacas = state.butacas_actualizadas;
      new_butacas[action.payload.index] = {...new_butacas[action.payload.index], estado : action.payload.estado};
      return {...state, butacas_actualizadas : new_butacas};
    case SUBMIT_RESERVA:
      return {...state, isSuccess : action.payload};
    default:
      return state;
  }
}
