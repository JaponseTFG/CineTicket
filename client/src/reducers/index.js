import { combineReducers } from 'redux';
import authReducer from './authReducer';
import peliculasReducer from './peliculasReducer';
import salasReducer from './salasReducer';
import entradasReducer from './entradasReducer';
import sesionesReducer from './sesionesReducer';
import reservasReducer from './reservasReducer';
import validacionReducer from './validacionReducer';


export default combineReducers({
    auth:  authReducer,
    pelis: peliculasReducer,
    salas: salasReducer,
    sesiones: sesionesReducer,
    entradas : entradasReducer,
    reserva: reservasReducer,
    validacion: validacionReducer,
});
