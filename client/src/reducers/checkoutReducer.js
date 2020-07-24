import { LOAD_RESERVAS } from '../actions/types';
import { ACTUALIZA_ESTADO_RESERVA } from '../actions/types';

const defaultState = { reservas : null, estado : null};

export default function (state = defaultState, action) {

  switch (action.type)
  {
    case LOAD_RESERVAS:
      return {...state, reservas : action.payload};
    case ACTUALIZA_ESTADO_RESERVA:
      return {...state, estado : action.payload};
    default:
      return state;
  }
}
