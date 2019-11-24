import { MODAL_OPEN, MODAL_CLOSE } from './modalConstants';
import {createReducer} from '../../app/common/util/reducerUtil';


const initialState = null;//whether we need it or not because of the way our application is structured we will always be needing the initial State


export const openModal = (state, payload) => {
    const {modalProps, modalType} = payload;
    return{
      modalType,
      modalProps
    }
}


//even though we will be needing the state and payload we will just be passing it
export const closeModal = (state, payload) => {
return null;
}

export default createReducer(initialState,{
    [MODAL_OPEN]: openModal,
    [MODAL_CLOSE]: closeModal
});