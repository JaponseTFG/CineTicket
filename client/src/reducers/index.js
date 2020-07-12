import { combineReducers } from 'redux';
import authReducer from './authReducer';
import ticketsReducer from './ticketsReducer';
import peliculaReducer from './peliculaReducer';

export default combineReducers({
    auth:  authReducer,
    paym:  ticketsReducer,
    peli:  peliculaReducer,
});
