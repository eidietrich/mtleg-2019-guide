import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css'
import './index.css';
import App from './views/App.jsx';
// import pym from 'pym.js';
import ReactGA from 'react-ga'

ReactGA.initialize('UA-70813941-1')

ReactDOM.render(<App />, document.getElementById('root'));
// const pymChild = new pym.Child();