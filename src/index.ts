import App from "./App";
const port: number = Number(process.env.PORT) || 2000;
const app = new App();

app.useRoute();
app.runServer(port);
