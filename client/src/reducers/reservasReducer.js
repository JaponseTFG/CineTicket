import { LOAD_CARTELERA } from '../actions/types';
import { TARGET_PELICULA_RESERVA } from '../actions/types';
import { TARGET_SESION_RESERVA } from '../actions/types';
import { TARGET_SESIONES_RESERVA } from '../actions/types';
import { LOAD_SALA_RESERVA } from '../actions/types';
import { TARGET_BUTACA_RESERVA } from '../actions/types';
import { ACTUALIZA_BUTACA_RESERVA } from '../actions/types';
import { SUBMIT_RESERVA } from '../actions/types';

const defaultState = {cartelera:null, pelicula: null, sesiones: null, sesion: null, butacas:null, isRedirect:false};

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
      return {...state, sesion : state.sesiones[action.payload]};
    case LOAD_SALA_RESERVA:
      return;
    case TARGET_BUTACA_RESERVA:
      return;
    case ACTUALIZA_BUTACA_RESERVA:
      return;
    case SUBMIT_RESERVA:
      return;
    default:
      return state;
  }
}
