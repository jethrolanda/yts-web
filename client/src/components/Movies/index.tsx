import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { List, Card, Avatar, Skeleton } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

interface test {
    icon: any;
    text: any;
    key: any;
}

const IconText = (props: test) => (
    <span>
        {React.createElement(props.icon, { style: { marginRight: 8 } })}
        {props.text}
    </span>
);

const MovieList = () => {

    const [data, setData] = useState([]);
    const [movieCount, setMovieCount] = useState(0);
    const [pageSize, setPageSize] = useState(0);
    const [customers, setCustomers] = useState([]);

    const fetchMovies = (page: number = 1) => {
        axios.get('https://yts.mx/api/v2/list_movies.json',
            { params: { page } })
            .then(function (response) {
                // console.log(response);
                setData(response.data.data.movies);
                setMovieCount(response.data.data.movie_count);
                setPageSize(response.data.data.limit);
            });
        fetch('/api/customers')
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then((customers: any) => setCustomers(customers))
    }

    useEffect(() => {
        fetchMovies();
    }, []);


    return (
        <div className="movies">
            {console.log(customers)}
            {(data.length > 0) ?
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
                    dataSource={data}
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
