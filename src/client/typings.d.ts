// declare module '*.module.css' {
//   const classes: { [key: string]: string };
//   export default classes;
// }

declare module '*.module.css';

// src/global.d.ts
declare module '*.png' {
  const value: string;
  export default value;
}