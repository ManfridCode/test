import {combineReducers, createStore} from 'redux'
import { reducer as formReducer } from 'redux-form'

const rootReducer = {form:formReducer};
//export type typeRootState = ReturnType<typeof rootReducer>

export default createStore(combineReducers(rootReducer));
