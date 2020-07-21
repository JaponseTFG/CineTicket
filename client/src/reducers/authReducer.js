import { GET_AUTH } from '../actions/types';

const defaultState = null;

export default function (state = defaultState, action) {
  switch (action.type)
  {
    case GET_AUTH:
      return action.payload || false;
    default:
      return state;
  }
}
