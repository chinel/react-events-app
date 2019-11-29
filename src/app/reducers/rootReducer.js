import {  combineReducers} from 'redux';
import { reducer as formReducer} from 'redux-form';
import {  reducer as toastrReducer } from 'react-redux-toastr';
import testReducer from '../../features/testarea/testReducer';
import eventReducer from '../../features/event/eventReducer';
import modalReducer from '../../features/modals/modalReducer';
import authReducer from '../../features/auth/authReducer';
import asyncReducer from '../../features/async/asyncReducer';




const rootReducer = combineReducers({
    form: formReducer,
    test: testReducer,
    events: eventReducer,
     modals: modalReducer,
     auth: authReducer,
     async: asyncReducer,
     toastr: toastrReducer
})

export default rootReducer;