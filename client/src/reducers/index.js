import { combineReducers } from 'redux';
import authReducer from './authReducer';
import ticketsReducer from './ticketsReducer';
import peliculasReducer from './peliculasReducer';
import salasReducer from './salasReducer';
import sesionesReducer from './sesionesReducer';
import reservasReducer from './reservasReducer';

export default combineReducers({
    auth:  authReducer,
    paym:  ticketsReducer,
    pelis: peliculasReducer,
    salas: salasReducer,
    sesiones: sesionesReducer,
    reserva: reservasReducer,
});
