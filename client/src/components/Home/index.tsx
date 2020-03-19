import React, { useEffect, useCallback } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

// Actions
import { MovieActions } from '../../actions/movieAction';

const { featuredMovies } = MovieActions;

const Home = (props: any) => {

    const { actions } = props;
    const featuredMoviesTrigger = useCallback(() => {

        actions.featuredMovies();

    }, [actions]);

    useEffect(() => {

        featuredMoviesTrigger();

    }, [featuredMoviesTrigger]);

    return (
        <>
            <div>Popular Downloads</div>
            <div></div>
        </>
    );
}

const mapStateToProps = (store: any) => ({ data: store.movies, isSearching: store.isSearching });

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators({ featuredMovies }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);