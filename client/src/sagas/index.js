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
            axios.get(`/api/movies?page=${page}&per_page=${per_page}`)
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
            axios.get(`/api/movies?query_term=${action.payload}`)
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

        const response = yield call(() =>
            axios.get('/api/movies/featured')
        );
        console.log(response)
        
        const data = yield call(() =>
            axios('https://yts.mx/')
                .then(response => {
                    const html = response.data;
                    const $ = cheerio.load(html);
                    const featuredMovies = $('#popular-downloads .browse-movie-wrap');


                    var myPromise = new Promise(function (resolve, reject) {
                        const featuredMoviesList = [];


                        featuredMovies.each(async function () {

                            const movieLink = $(this).find('a.browse-movie-link').attr('href');

                            const movieData = await axios(movieLink)
                                .then(async movieDetails => {
                                    const htmlDetails = movieDetails.data;
                                    const $details = cheerio.load(htmlDetails);

                                    const movieID = $details('#movie-info').attr('data-movie-id');
                                    if (movieID)
                                        return await axios.get('/api/movie/' + movieID);
                                    else
                                        return null;
                                });

                            featuredMoviesList.push(movieData.data);

                        });

                        setInterval(function () {
                            if (featuredMoviesList.length >= 4)
                                resolve(featuredMoviesList);
                        }, 300);

                    });

                    return myPromise.then(function (result) {
                        return result;
                    });

                })
                .catch(console.error)
        );

        if (data) {
            yield put(
                MovieActions.setFeaturedMovies({ data })
            );
        }

    } catch (e) {
        console.log(e)
    }
}


export const actionListener = [
    takeEvery(MOVIE_TYPES.FETCH_MOVIES, fetchMovies),
    takeEvery(MOVIE_TYPES.SEARCH_MOVIES, searchMovies),
    takeEvery(MOVIE_TYPES.FETCH_FEATURED_MOVIES, featuredMovies)
];

export default function* rootSaga() {
    yield all(actionListener);
}