import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// import container components
import HomePage from './containers/homePage.container'
import ScreenOne from './containers/screenOne.container'
import ScreenTwo from './containers/screenTwo.container'

import store from './store'

import './styles/style.css'

const render = () => {
 ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/play" component={ScreenOne} />
        <Route exact path="/results" component={ScreenTwo} />
        <Route path="*" render={() => <Redirect to={{ pathname: '/' }} />} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
}

store.subscribe(render)

render ()
