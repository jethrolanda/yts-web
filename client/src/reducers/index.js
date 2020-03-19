import moviesReducer from './moviesReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    movies: moviesReducer
});

export default reducers;