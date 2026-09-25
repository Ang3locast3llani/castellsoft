// Targeted shims to allow importing pages implemented in .jsx from .tsx files
// These declare the specific module path used in the project and a simple default export of type any.

declare module './Paginas/Home/Home' {
  const Home: any;
  export default Home;
}

// Generic pattern for page components inside Paginas folder
declare module '*/Paginas/*/*' {
  const Component: any;
  export default Component;
}
