const express = require('express');
const app = express();
const axios = require('axios');
const yts_api_base_url = 'https://yts.mx/api/v2/';

// Server Base URL
app.get('/', (req, res) => {
    res.json('Hello world');
});

// Get All Movies
app.get('/api/movies', async (req, res, next) => {

    await axios.get(`${yts_api_base_url}list_movies.json`,
        {
            params: {
                page: req.query.page,
                limit: req.query.per_page,
                query_term: req.query.query_term
            }
        })
        .then(result => {
            
            res.json({
                movie_list: result.data.data.movies,
                movie_count: result.data.data.movie_count,
                page_size: result.data.data.limit,
            });
        })
        .catch(err => res.send(err));

});

// Get Movie Detail
app.get('/api/movie/:uid', async (req, res, next) => {

    await axios.get(`${yts_api_base_url}movie_details.json?movie_id=${req.params.uid}`)
        .then(result => {
            res.json(result.data.data.movie);
        })
        .catch(err => res.send(err));

});

// Search Movies
app.get('/api/movies/:uid', async (req, res, next) => {

    await axios.get(`${yts_api_base_url}movie_details.json?movie_id=${req.params.uid}`)
        .then(result => {
            res.json(result.data.data.movie);
        })
        .catch(err => res.send(err));

});

// Featured Movies
app.get('/api/movies/featured', async (req, res, next) => {

    await axios.get(`${yts_api_base_url}movie_details.json?movie_id=${req.params.uid}`)
        .then(result => {
            console.log(result)
            res.json(result.data.data.movie);
        })
        .catch(err => res.send(err));

});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));