import http from "http";
import app from "./app.js";

const server = http.createServer(app);
const port = process.env.PORT || 4000;

server.listen(port, () => console.log(`Server is up on port ${port}`));
