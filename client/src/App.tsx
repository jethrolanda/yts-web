import React from 'react';
import SearchMovies from './components/SearchMovies/';
import MovieList from './components/Movies/';
import Movie from './components/Movies/Movie';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import 'antd/dist/antd.css';
import './styles.scss';

import { Layout, Button } from 'antd';
const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <div className="App">
        <Header style={{ color: '#fff' }}>
          <Link to="/">YTS Movies</Link>
          <ul className="menu">
            <li><Link to="/"><Button type="primary">Home</Button></Link></li>
            <li><Link to="/movies"><Button type="primary">Browse Movies</Button></Link></li>
          </ul>
        </Header>
        <Content className="site-layout-background" style={{ padding: '0 50px' }}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/movies">
              <SearchMovies />
              <MovieList />
            </Route>
            <Route path="/movie/:id" component={Movie} />
          </Switch>

        </Content>
      </div >
    </Router>
  );
}

export default App;
