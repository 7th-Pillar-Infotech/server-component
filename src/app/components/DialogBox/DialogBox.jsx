// src/app/components/DialogBox/DialogBox.jsx
import React, { useState } from 'react';

export default function DialogBox() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ border: '1px solid black', padding: '20px' }}>
      <h2>This is a Server-Rendered Dialog</h2>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
    </div>
  );
}
