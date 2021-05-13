import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import AllMovie from './components/AllMovie';
import FavoriteMovie from './components/FavoriteMovie';
import MovieDetail from './components/MovieDetail';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={AllMovie} />
        <Route exact path='/favorite' component={FavoriteMovie} />
        <Route exact path='/movie/:id' component={MovieDetail} />
        <Route path='*' component={() => '404 NOT FOUND'} />
      </Switch>
    </div>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <App />    
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
