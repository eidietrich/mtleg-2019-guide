import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App.jsx';
import pym from 'pym.js';

ReactDOM.render(<App />, document.getElementById('root'));
const pymChild = new pym.Child();