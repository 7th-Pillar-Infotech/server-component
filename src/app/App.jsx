import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styles from './App.module.css';
import Welcome from './components/Welcome/Welcome';
import logo from './logo.svg';

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <header className={styles['App-header']}>
          <img src={logo} className={styles['App-logo']} alt="logo" />
          <Welcome />
        </header>
      </div>
    </Router>
  );
}

export default App;
