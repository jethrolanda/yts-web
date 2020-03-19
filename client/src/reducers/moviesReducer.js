import { MOVIE_TYPES } from '../actions/types';

const test = {
    movies: [],
    movieCount: 0,
    pageSize: 0,
    currentPage: 1,
    search: '',
    isSearching: true
}

export default function (state = test, action) {
    switch (action.type) {
        case MOVIE_TYPES.SET_MOVIES:

            const { movie_list, movie_count, page_size, page } = action.payload.data;

            return {
                ...state,
                movies: movie_list || [],
                movieCount: movie_count,
                pageSize: page_size,
                currentPage: page,
                isSearching: false
            };

        case MOVIE_TYPES.LOADING_MOVIES:

            return {
                ...state,
                isSearching: action.payload
            };

        default:
            return state
    }
}