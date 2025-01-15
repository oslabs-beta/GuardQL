import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App'; // Check this path is correct

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
// the ! is called the Non-Null Assertion Operator
// it will tell TypeScript compiler that the value is not null
// It can be risky because it can lead to runtime errors if the assumption is wrong. Can lead to error if the root is missing.

// alternative method (safer)
/**
const rootElement = document.getElementById('root');

// Ensure rootElement is not null
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("Root element not found. Application cannot render.");
}
 */