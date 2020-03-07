const express = require('express');
const app = express();
const axios = require('axios');

app.get('/', (req, res) => {
    res.json('Hello world');
});
app.get('/api/customers', (req, res) => {
    // console.log(req);
    // console.log(res);
    const customers = [
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 2, firstName: 'Steve', lastName: 'Smith' },
        { id: 3, firstName: 'Mary', lastName: 'Swanson' }
    ];

    // axios.get('https://yts.mx/api/v2/list_movies.json',
    //     { params: { page } })
    //     .then(function (response) {
    //         console.log(response);
    //         setData(response.data.data.movies);
    //         setMovieCount(response.data.data.movie_count);
    //         setPageSize(response.data.data.limit);
    //     });

    res.json(customers);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));