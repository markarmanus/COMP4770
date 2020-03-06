let express = require("express");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);
let MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://mongo:27017/", function(err, client) {
  if (err) throw err;
  const adminDb = client.db("admin").admin();
  adminDb.listDatabases((err, dbs) => {
    console.log(dbs.databases.length);
  });
});

app.get("/", (req, res) => {
  res.sendFile("/usr/src/app/client/index.html");
});

io.on("connection", socket => {
  socket.on("eventHappened", data => {
    console.log(data);
  });
});
app.use("/client", express.static(__dirname + "/client"));
app.use(express.static(__dirname + "/cleint"));

server.listen(5000, () => {
  console.log("Connected");
});
