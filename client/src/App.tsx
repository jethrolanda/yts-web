import React from "react";
import SearchMovies from "./components/SearchMovies/";
import MovieList from "./components/Movies/";
import Movie from "./components/Movies/Movie";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "antd/dist/reset.css";
import "./styles.scss";
import { VideoCameraOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div
            style={{
              float: "left",
              width: 80,
              height: 50,
              margin: "6px 24px 14px 0px",
              background: "rgba(255, 255, 255, 0.2)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <VideoCameraOutlined style={{ fontSize: "20px", color: "#fff" }} />
          </div>

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={[
              { key: 1, label: <Link to="/">Home</Link> },
              {
                key: 2,
                label: <Link to="/movies">Browse Movies</Link>
              }
            ]}
          />
        </Header>
        <Content style={{ padding: "50px" }}>
          <div className="site-layout-content" style={{ padding: "10px" }}>
            <Routes>
              <Route
                path="/movies"
                element={
                  <>
                    <SearchMovies />
                    <MovieList />
                  </>
                }
              ></Route>
              <Route path="/movie/:id" element={<Movie />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
