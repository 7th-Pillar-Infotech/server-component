function e() {
  const [e, t] = React.useState(0);
  return React.createElement(
    'div',
    null,
    React.createElement('p', null, `You clicked ${e} times`),
    React.createElement('button', { onClick: () => t(e + 1) }, 'Click Me')
  );
}
export default e;
