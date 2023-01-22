import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { List, Card, Skeleton, Pagination, Spin, Image } from "antd";
import { connect } from "react-redux";

// Actions
import { MovieActions } from "../../actions/movieAction";

import { bindActionCreators } from "redux";

import "./styles.scss";

const { Meta } = Card;

interface IMovies {
  movie_list: [];
  movie_count: number;
  page_size: number;
}

const { fetchMovies, loadingMovies } = MovieActions;

const MovieList = (props: any) => {
  const { actions, data } = props;
  const { movies, movieCount, pageSize, currentPage, isSearching } = data;

  const fetchMoviesTrigger = useCallback(
    (page: number = 1, per_page: number = 24) => {
      actions.loadingMovies(true);
      actions.fetchMovies({
        page,
        per_page,
        processCB: () => {
          console.log("processing");
        },
        successCB: () => {
          console.log("success");
        },
        failCB: () => {
          console.log("fail");
        }
      });
    },
    [actions]
  );

  useEffect(() => {
    // Step: 1
    // This is the trigger, will call the actions
    fetchMoviesTrigger();
  }, [fetchMoviesTrigger]);

  return (
    <div className="movies">
      <Pagination
        showSizeChanger
        pageSizeOptions={["24", "48"]}
        onShowSizeChange={(current, pageSize) =>
          fetchMoviesTrigger(current, pageSize)
        }
        total={movieCount}
        showTotal={(total) => `Total ${total} items`}
        pageSize={pageSize}
        current={currentPage}
        onChange={fetchMoviesTrigger}
      />
      {movies && !isSearching ? (
        <List
          grid={{
            gutter: 16,
            column: 6,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4
          }}
          dataSource={movies}
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
        <List
          grid={{
            gutter: 16,
            column: 6,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4
          }}
          dataSource={new Array(12).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`
            };
          })}
          renderItem={(item: any) => (
            <List.Item>
              <Card hoverable cover={<Skeleton.Image active />}>
                <Meta title={<Skeleton paragraph={{ rows: 1 }} />} />
              </Card>
            </List.Item>
          )}
        />
      )}
      <Pagination
        showSizeChanger
        pageSizeOptions={["24", "48"]}
        onShowSizeChange={(current, pageSize) =>
          fetchMoviesTrigger(current, pageSize)
        }
        total={movieCount}
        showTotal={(total) => `Total ${total} items`}
        pageSize={pageSize}
        current={currentPage}
        onChange={fetchMoviesTrigger}
      />
    </div>
  );
};

const mapStateToProps = (store: any) => ({
  data: store.movies,
  isSearching: store.isSearching
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators({ fetchMovies, loadingMovies }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
