import React from 'react';

import { Input, Row, Col } from 'antd';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
// Actions
import { MovieActions } from '../../actions/movieAction';

import './styles.scss';
const { Search } = Input;
const { searchMovies, loadingMovies } = MovieActions;

const SearchMovies = (props: any) => {
    console.log(props);
    const { actions, search } = props;

    const searchMoviesAcction = (value: string) => {
        actions.loadingMovies(true);
        actions.searchMovies(value)
    }
    return (
        <div className="search-movies">
            <Row>
                <Col span={8}>
                    <Search placeholder="Search Movies" onSearch={value => searchMoviesAcction(value)} enterButton value={search} />
                </Col>
            </Row>

        </div>
    );

}

const mapStateToProps = (store: any) => ({ search: store.search });

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators({ searchMovies, loadingMovies }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchMovies);
