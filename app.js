let express = require("express")
let app = express()
let server = require("http").Server(app)
let io = require("socket.io")(server)

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html")
})

io.on("connection", socket => {
  socket.on("eventHappened", data => {
    console.log(data)
  })
})
app.use("/client", express.static(__dirname + "/client"))

server.listen(3000, () => {
  console.log("Connected")
})
