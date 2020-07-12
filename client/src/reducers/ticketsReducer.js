import { FETCH_PAYMENT } from '../actions/types';
import { FETCH_USER } from '../actions/types';

export default function (state, action) {
  switch (action.type)
  {
    case FETCH_PAYMENT:
      return {waiting:action.payload.waiting||false, credits:action.payload.credits||state.credits};
    case FETCH_USER:
      return {waiting:false, credits:action.payload.credits|| 0};
    default:
      return {waiting:false, credits: 0};
  }
}
