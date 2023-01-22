import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { List, Card, Skeleton, Spin, Image } from "antd";
import { Link } from "react-router-dom";

// Actions
import { MovieActions } from "../../actions/movieAction";
import "./styles.scss";

interface Props {
  comp: React.ElementType; // 👈️ type it as React.ElementType
}

const { Meta } = Card;
const { fetchFeaturedMovies } = MovieActions;

const Home = (props: any) => {
  const { actions, featured_movies } = props;

  useEffect(() => {
    actions.fetchFeaturedMovies();
  }, [actions]);

  return (
    <div id="home">
      <h1>Popular Downloads</h1>
      {featured_movies !== true ? (
        <List
          grid={{ gutter: 50, column: 6 }}
          dataSource={featured_movies}
          renderItem={(item: any) => (
            <List.Item>
              <Link to={`/movie/${item.id}`}>
                <Card
                  hoverable
                  cover={
                    <Image
                      src={item.medium_cover_image}
                      alt={item.title_long}
                      placeholder={<Spin />}
                    />
                  }
                >
                  <Meta title={item.title} description={item.year} />
                </Card>
              </Link>
            </List.Item>
          )}
        />
      ) : (
        <Skeleton paragraph={{ rows: 4 }} />
      )}
    </div>
  );
};

const mapStateToProps = (store: any) => ({
  featured_movies: store.featured_movies
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators({ fetchFeaturedMovies }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
