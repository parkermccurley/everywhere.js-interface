import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

const message = "Hello, world!";

const App = props => (
  <div>
    <h1>{ props.message }</h1>
  </div>
);

ReactDOM.render(
  <App message={ message } />,
  document.querySelector('.app')
);
