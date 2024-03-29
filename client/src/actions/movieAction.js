// Step 2
// this is called after the trigger in the component
import { MOVIE_TYPES } from './types';

export const MovieActions = {
    fetchMovies: (payload) => ({
        type: MOVIE_TYPES.FETCH_MOVIES,
        payload
    }),
    searchMovies: (payload) => ({
        type: MOVIE_TYPES.SEARCH_MOVIES,
        payload
    }),
    setMovies: (payload) => ({
        type: MOVIE_TYPES.SET_MOVIES,
        payload
    }),
    loadingMovies: (payload) => ({
        type: MOVIE_TYPES.LOADING_MOVIES,
        payload
    }),
    fetchFeaturedMovies: (payload) => ({
        type: MOVIE_TYPES.FETCH_FEATURED_MOVIES,
        payload
    }),
    setFeaturedMovies: (payload) => ({
        type: MOVIE_TYPES.SET_FEATURED_MOVIES,
        payload
    })
};
