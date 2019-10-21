import { combineReducers } from 'redux';
import theme from "./Theme";
import userIsMe from './Users';

export default combineReducers({
    userIsMe,
    theme
})