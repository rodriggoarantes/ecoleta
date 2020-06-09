import App from './app';

const app = new App();
const server = app.listen().getServer();

export default server;
