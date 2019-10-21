import { combineReducers } from 'redux';
import UIState from './UIState';
import AppState from './AppState'

export default combineReducers({
    UIState,
    AppState
});