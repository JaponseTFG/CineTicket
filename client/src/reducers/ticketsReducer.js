import { FETCH_PAYMENT } from '../actions/types';
import { GET_AUTH } from '../actions/types';

const defaultState = {waiting:false, credits: 0};

export default function (state = defaultState, action) {
  switch (action.type)
  {
    case FETCH_PAYMENT:
      return {waiting:action.payload.waiting||false, credits:action.payload.credits||state.credits};
    case GET_AUTH:
      return {waiting:false, credits:action.payload.credits|| 0};
    default:
      return state;
  }
}
