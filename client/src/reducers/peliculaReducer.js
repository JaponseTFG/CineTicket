import { SUBMIT_PELICULA } from '../actions/types';
import { EDIT_PELICULA } from '../actions/types';

export default function (state, action) {
  switch (action.type)
  {
    case EDIT_PELICULA:
      return {waiting:false, datosPelicula:action.payload.pelicula||state.pelicula};
    case SUBMIT_PELICULA:
      return {waiting:action.payload.waiting||false, datosPelicula:action.payload.pelicula||state.pelicula};
    default:
      return {waiting:false, datosPelicula: null};
  }
}
