import React, { useEffect, useState } from 'react';
import Img from 'react-image';
import { Spin, Skeleton, Tag, Row, Col, Modal, Button } from 'antd';
import YouTube from 'react-youtube';

import './styles.scss';

const MovieGenres = (props: { genres: [] }) => {
    const genres = props.genres.map((item: any, key: any) =>
        <Tag key={key} color="#108ee9">{item}</Tag>
    );
    return (
        <>
            {genres}
        </>
    )
}

const MovieQuality = (props: { torrents: [] }) => {
    const genres = props.torrents.map((item: any, key: any) =>
        <Tag key={key} color="#108ee9">{item.quality}</Tag>
    );
    return (
        <>
            {genres}
        </>
    )
}


const Movie = (props: any) => {
    const [movie, setMovie] = useState([]);
    const [showTrailerModal, setShowTrailerModal] = useState(false);

    const fetchMovie = async (movie_id: number) => {
        await fetch('/api/movie/' + movie_id)
            .then(res => res.json())
            .then((result) => {
                setMovie(result);
            })
    }

    useEffect(() => {
        const movie_id = props.match.params.id;
        if (movie_id)
            fetchMovie(movie_id);
    }, [props]);

    const data: any = movie;

    const MovieTrailer = (props: { title: string, yt_trailer_code: string }) => {

        return (
            <>
                <Modal
                    title={props.title}
                    visible={showTrailerModal}
                    onCancel={() => setShowTrailerModal(false)}
                    footer={null}
                    width="50%">
                    <YouTube
                        videoId={props.yt_trailer_code}
                        opts={{ width: '100%' }}
                        onReady={(event) => event.target.pauseVideo()}
                    />
                </Modal>
            </>)

    }

    return (
        <div className="movie">
            {console.log(data)}
            {(data.id) ?
                <>
                    <Row>
                        <Col span={6}>
                            <Img
                                src={data.large_cover_image}
                                alt={data.title_long}
                                loader={<Spin />}
                                className="poster" />
                        </Col>
                        <Col span={12}>
                            <h1>{data.title}</h1>
                            <h4>Year: {data.year}</h4>
                            <h4>Genres: {<MovieGenres genres={data.genres} />}</h4>
                            <h4>Quality: {<MovieQuality torrents={data.torrents} />}</h4>
                            <h4>IMDB Rating: {data.rating}</h4>
                            <h4>Likes: {data.like_count}</h4>
                            <p>{data.description_full}</p>

                            <Button type="primary" onClick={() => setShowTrailerModal(true)}>
                                Watch Trailer
                            </Button>
                            <MovieTrailer title={data.title} yt_trailer_code={data.yt_trailer_code} />
                        </Col>
                        <Col span={6}>Suggestions</Col>
                    </Row>
                </> : <Skeleton avatar paragraph={{ rows: 4 }} />
            }

        </div >
    );

}


export default Movie;
