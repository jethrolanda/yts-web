import moviesReducer from './moviesReducer';
import featuredMoviesReducer from './featuredMoviesReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    movies: moviesReducer,
    featured_movies: featuredMoviesReducer
});

export default reducers;