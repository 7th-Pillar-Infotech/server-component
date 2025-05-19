// import React from 'react';
// import './globals.css';

// import { createRoot } from 'react-dom/client';

// window.React = React;

// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);
// root.render(<App />);

// main.jsx or App.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ✅ Set window.React BEFORE anything else
window.React = React;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
