import React from 'react';
import SearchMovies from './components/SearchMovies/';
import MovieList from './components/Movies/';

import 'antd/dist/antd.css';

import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header style={{ color: '#fff' }}>
          YTS Movies
        </Header>
        <Content className="site-layout-background" style={{ padding: '0 50px' }}>
          <SearchMovies />
          <MovieList />
        </Content>
        <Footer>
          YTS Movies
        </Footer>
      </Layout>
    </div >
  );
}

export default App;
