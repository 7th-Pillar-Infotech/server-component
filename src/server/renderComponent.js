// src/server/renderComponent.js

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const fs = require('fs');
const path = require('path');
const { Writable } = require('stream');

// Import all shared components
const componentsPath = path.resolve(__dirname, '../../shared-components');
const componentFolders = fs
  .readdirSync(componentsPath, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory());

const components = {};

componentFolders.forEach((folder) => {
  const componentName = folder.name;
  const componentFilePath = path.resolve(
    componentsPath,
    componentName,
    `${componentName}.jsx`
  );

  try {
    const componentModule = require(componentFilePath);
    const Component = componentModule.default || componentModule;
    // Save it in registry
    components[componentName] = Component;
  } catch (err) {
    console.error(`Failed to load component "${componentName}":`, err.message);
  }
});

module.exports = async function renderComponent(name, props = {}) {
  const Component = components[name];
  if (!Component) throw new Error(`Component ${name} not found`);

  return new Promise((resolve, reject) => {
    let html = '';

    const { pipe } = ReactDOMServer.renderToPipeableStream(
      <Component {...props} />
    );

    // Create a real Writable stream that collects the HTML
    const writable = new Writable({
      write(chunk, encoding, callback) {
        html += chunk.toString();
        callback();
      },
    });

    writable.on('finish', () => {
      resolve(html);
    });

    // Pipe rendered output into our stream
    pipe(writable);

    // Optional: handle errors
    writable.on('error', (err) => {
      console.error('Writable stream error:', err);
      reject(err);
    });
  });
};
