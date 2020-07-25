import { LOAD_INFO_ENTRADA } from '../actions/types';
import { TARGET_ENTRADA } from '../actions/types';
import { VALIDA_ENTRADA } from '../actions/types';

const defaultState = { entrada : null, id_entrada : null, isValidada: null};

export default function (state = defaultState, action) {

  switch (action.type)
  {
    case LOAD_INFO_ENTRADA:
      return {...state, entrada : action.payload};
    case TARGET_ENTRADA:
      return {...state, id_entrada : action.payload};
    case VALIDA_ENTRADA:
      return {...state, isValidada : action.payload};
    default:
      return state;
  }
}
