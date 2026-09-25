// Allow importing plain JS/JSX files into TypeScript without type errors
// This treats such modules as "any". Consider migrating components to .tsx
// or adding more specific typings long-term.

declare module '*.js';
declare module '*.jsx';

declare module '*.mjs';
