import React from 'react';
import ReactDOM from 'react-dom';

// styles
import './styles/app.css';

// components
import App from './App';

// utility scripts
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
