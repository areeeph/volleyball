require("dotenv").config();

const http = require("http");
const app = require("./src/app");
const { sequelize } = require("./src/models");
const { Server } = require("socket.io");
const { initSocket } = require("./src/socket");

const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

const io = initSocket(server);

const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log("Database connected");

    // Development only
    await sequelize.sync();

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:");
    console.error(error);
    process.exit(1);
  }
};

startServer();