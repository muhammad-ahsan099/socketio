const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const port = process.env.PORT || 5000;

const { Server } = require("socket.io");
var dbConnection = require("./config/Db");

const Msg = require('./messages/MessagesModal');

dbConnection();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // origin: "http://localhost:3000",
    // origin: ["http://192.168.100.255" , "http://localhost:3000" ],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // io.on('connection', (socket) => {
  //   console.log(`User Connected: ${socket.id}`);
  //   Msg.find({}
  //     , (err, data) => {
  //     console.log("success Fetch Data", data.splice(0, 2));
  //     console.log("err", err);
  //     if (err) {
  //       console.log("err happen", err);
  //     }
  //     // res.json(data);
  //     socket.to(data.room).emit("receive_message", data);
  
  //   });


  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });



  socket.on("send_message", (data) => {
    console.log('msg from client: ' , data);
    // const message = new Msg({
    //   room: data.room ,
    //   author: data.author ,
    //   message: data.message,
    //   time: data.time
    // })
    // console.log('Message' , message);
    // message.save((err, success)=> {
      socket.to(data.room).emit("receive_message", data);

      // io.emit('receive_message', data)
      // console.log('success' , success);
      // console.log('err' , err);

    })
  // }
  // );

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`SERVER RUNNING ${port} `);
});


