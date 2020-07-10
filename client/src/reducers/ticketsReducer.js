import { FETCH_PAYMENT } from '../actions/types';

export default function (state = null, action) {
  switch (action.type)
  {
    case FETCH_PAYMENT:
      return action.payload.credits || "procesando";
    default:
      return state;
  }
}
