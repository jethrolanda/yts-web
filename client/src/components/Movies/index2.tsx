import React, { useEffect, useState } from 'react';
// import axios from 'axios';

import { List, Card, Avatar, Skeleton } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

interface test {
    icon: any;
    text: any;
    key: any;
}

interface IMovies {
    movie_list: [];
    movie_count: number;
    page_size: number;
}

const IconText = (props: test) => (
    <span>
        {React.createElement(props.icon, { style: { marginRight: 8 } })}
        {props.text}
    </span>
);

const MovieList = () => {

    const [movies, setMovies] = useState([]);
    const [movieCount, setMovieCount] = useState(0);
    const [pageSize, setPageSize] = useState(0);

    const fetchMovies = async (page: number = 1) => {
        await fetch('/api/movies?page=' + page)
            .then(res => res.json())
            .then((result: IMovies) => {
                setMovies(result.movie_list);
                setMovieCount(result.movie_count);
                setPageSize(result.page_size);
            })
    }

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div className="movies">
            {(movies.length > 0) ?
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            fetchMovies(page);
                        },
                        defaultCurrent: 1,
                        pageSize: pageSize,
                        total: movieCount
                    }}
                    dataSource={movies}
                    footer={
                        <div> <b>ant design</b> footer part</div>
                    }
                    renderItem={(item: any) => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                            ]}
                            extra={
                                <img
                                    width={272}
                                    alt={item.title_long}
                                    src={item.medium_cover_image}
                                />
                            }
                        >
                            <List.Item.Meta
                                title={<a href={item.href}>{item.title}</a>}
                            />
                            {item.description_full}
                        </List.Item>
                    )}
                /> : <Skeleton avatar paragraph={{ rows: 4 }} />
            }
            {/* <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={data}
                renderItem={(item: any) => (

                    < List.Item >
                        <Card title={item.title}>Card content</Card>
                    </List.Item>
                )}
            /> */}

        </div>
    );
}

export default MovieList;
