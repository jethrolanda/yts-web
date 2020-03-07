import React, { useEffect, useState } from 'react';
// import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Img from 'react-image';
import { List, Card, Skeleton, Pagination, Spin } from 'antd';
import './styles.scss';

const { Meta } = Card;

interface IMovies {
    movie_list: [];
    movie_count: number;
    page_size: number;
}

const MovieList = () => {

    const [movies, setMovies] = useState([]);
    const [movieCount, setMovieCount] = useState(0);
    const [pageSize, setPageSize] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchMovies = async (page: number = 1) => {
        await fetch('/api/movies?page=' + page)
            .then(res => res.json())
            .then((result: IMovies) => {
                setMovies(result.movie_list);
                setMovieCount(result.movie_count);
                setPageSize(result.page_size);
                setCurrentPage(page);
            })
    }

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div className="movies">
            <Pagination
                total={movieCount}
                showTotal={total => `Total ${total} items`}
                pageSize={pageSize}
                current={currentPage}
                onChange={fetchMovies}
            />
            {(movies.length > 0) ?
                <List
                    grid={{ gutter: 16, column: 6 }}
                    dataSource={movies}
                    renderItem={(item: any) => (
                        <List.Item>
                            <Card
                                hoverable
                                cover={
                                    <Img
                                        src={item.medium_cover_image}
                                        alt={item.title_long}
                                        loader={<Spin />} />
                                } >
                                <Meta
                                    title={item.title}
                                    description={item.year}
                                />
                            </Card>
                        </List.Item>
                    )
                    }
                /> : <Skeleton avatar paragraph={{ rows: 4 }} />
            }
            <Pagination
                total={movieCount}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                pageSize={pageSize}
                current={currentPage}
                onChange={fetchMovies}
            />
        </div >
    );
}

export default MovieList;
