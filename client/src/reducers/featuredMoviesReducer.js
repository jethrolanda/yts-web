import { MOVIE_TYPES } from '../actions/types';

export default function (state = [], action) {

    switch (action.type) {

        case MOVIE_TYPES.FETCH_FEATURED_MOVIES:
            return true;

        case MOVIE_TYPES.SET_FEATURED_MOVIES:
            return action.payload.data || [];

        default:
            return state
    }
}