import { createRequire } from "module";
const require = createRequire(import.meta.url);

const initSocket = (server) => {
  const socketIO = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });
  socketIO.on("connection", (socket) => {
    console.log(`${socket.id} user is just connected`);
  });
  socketIO.on("update", (socket) => {
    console.log(`${socket.id} user is just connected`);
  });
};

export { initSocket };
