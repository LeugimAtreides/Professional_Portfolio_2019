import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/RootReducer';
import logger from 'redux-logger';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

export default function configureStore(initialState = {}){
    return createStore(
        rootReducer,
        composeEnhancer(applyMiddleware(thunk), applyMiddleware(logger)),
    );
}