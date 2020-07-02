declare module '*.png';

declare module '*.jpg';

declare module '*.json';

declare module '*.svg' {
  const content: string;
  export default content;
}
