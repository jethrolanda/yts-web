// Step 3
// This will listen to any actions fired in actions creators
// Also process any functions

import { takeEvery, all, put, call } from "redux-saga/effects";
// Types
import { MOVIE_TYPES } from '../actions/types';
// Actions
import { MovieActions } from '../actions/movieAction';

import axios from 'axios';
import cheerio from 'cheerio';

export function* fetchMovies(action) {

    const { page, per_page } = action.payload;

    try {

        const response = yield call(() =>
            axios.get('/api/movies?page=' + page + '&per_page=' + per_page)
        );

        if (response && response.data) {
            const data = { ...response.data, page };
            yield put(
                MovieActions.setMovies({ data })
            );

        }
    } catch (e) {
        console.log(e)
    }

}

export function* searchMovies(action) {

    try {

        const response = yield call(() =>
            axios.get('/api/movies?query_term=' + action.payload)
        );

        if (response && response.data) {
            const data = { ...response.data, search: action.payload };
            yield put(
                MovieActions.setMovies({ data })
            );

        }

    } catch (e) {
        console.log(e)
    }
}

export function* featuredMovies(action) {

    try {
        console.log(action)
        const response = yield call(() =>
            axios('https://yts.mx/')
                .then(response => {
                    const html = response.data;
                    const $ = cheerio.load(html);
                    const featuredMovies = $('#popular-downloads .browse-movie-wrap');
                    const featuredMoviesList = [];

                    featuredMovies.each(function () {
                        const title = $(this).find('.browse-movie-bottom .browse-movie-title').text();
                        const year = $(this).find('.browse-movie-bottom .browse-movie-year').text();

                        const search_movie = axios.get('/api/movies?query_term=' + title + ' ' + year);

                        console.log(search_movie);

                        featuredMoviesList.push({ title, year });
                    });
                    console.log(featuredMoviesList);

                })
                .catch(console.error)
        );

        if (response && response.data) {


        }

    } catch (e) {
        console.log(e)
    }
}


export const actionListener = [
    takeEvery(MOVIE_TYPES.FETCH_MOVIES, fetchMovies),
    takeEvery(MOVIE_TYPES.SEARCH_MOVIES, searchMovies),
    takeEvery(MOVIE_TYPES.FEATURED_MOVIES, featuredMovies)
];

export default function* rootSaga() {
    yield all(actionListener);
}