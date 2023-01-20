const http = require("http");
const app = require("./app");
const port = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Logged Error: ${err}`);
  console.log("shutting down server");
  server.close(() => process.exit(1));
});
