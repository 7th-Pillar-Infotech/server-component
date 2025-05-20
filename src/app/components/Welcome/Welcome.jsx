import React, { useEffect, useState } from 'react';
import classes from './Welcome.module.css';
import { hydrateRoot } from 'react-dom/client';

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
      .then(async ({ html, componentName }) => {
        console.log({ html, componentName });
        const container = document.getElementById('dialog-container');
        container.innerHTML = html;

        if (componentName) {
          await hydrateDynamicComponent(componentName, container);
        }
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

async function hydrateDynamicComponent(componentName, container) {
  try {
    const module = await import(
      /* @vite-ignore */ `/client/components/${componentName}/${componentName}.js`
    );
    const Component = module.default;

    if (!Component) {
      console.error(`Component ${componentName} not found in loaded module`);
      return;
    }

    hydrateRoot(container, <Component />);
  } catch (err) {
    console.error(`Hydration failed for ${componentName}:`, err);
  }
}

export default Welcome;
