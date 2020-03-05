import React from 'react';

import { Input, Row, Col } from 'antd';
import './styles.scss';
const { Search } = Input;

const SearchMovies = () => {

    return (
        <div className="search-movies">
            <Row>
                <Col span={8}>
                    <Search placeholder="Search Movies" onSearch={value => console.log(value)} enterButton />
                </Col>
            </Row>

        </div>
    );

}

export default SearchMovies;
