// src/server/renderComponent.js

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const fs = require('fs');
const path = require('path');

// Import all shared components
const componentsPath = path.resolve(__dirname, '../../src/app/components');
const componentFolders = fs
  .readdirSync(componentsPath, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory());

const components = {};

componentFolders.forEach((folder) => {
  console.log({ folder });
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

module.exports = async function renderComponent(name) {
  const Component = components[name];
  if (!Component) throw new Error(`Component ${name} not found`);
  return ReactDOMServer.renderToString(<Component />);
};
