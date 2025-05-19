import React, { useEffect, useState } from 'react';
import classes from './Welcome.module.css';

function Welcome() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
  }, []);

  const loadDialog = () => {
    fetch('api/dialog')
      .then((res) => res.json())
      .then(({ html }) => {
        document.getElementById('dialog-container').innerHTML = html;
        hydrateDialog();
      });
  };

  return (
    <div>
      <p className={classes.message}>{message}</p>
      <button onClick={loadDialog}>Show Dialog</button>
      <div id="dialog-container"></div>
    </div>
  );
}

// Hydration Logic
async function hydrateDialog() {
  const React = window.React;
  const { hydrateRoot } = await import('react-dom/client');
  const DialogBox = await import('../DialogBox/DialogBox.jsx');

  hydrateRoot(
    document.getElementById('dialog-container'),
    <DialogBox.default />
  );
}
export default Welcome;
