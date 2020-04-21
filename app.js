const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const connectDb = require("./server/db/connection");
const User = require("./server/db/models/User");
const Level = require("./server/db/models/Level");
const levelSeeder = require("./server/db/seeders/level");
const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(expressSession);
const store = new MongoDBStore({
  uri: "mongodb://mongo:27017/database",
  collection: "sessions",
});
const mongoose = require("mongoose");
const Types = mongoose.Types;
const ObjectId = Types.ObjectId;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/client"));

app.use(
  express.static(path.join(__dirname, "/client"), {
    index: false,
    extensions: ["js", "ejs"],
  })
);
app.use(
  express.static(path.join(__dirname, "/client/Assets"), {
    index: false,
    extensions: ["png"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  require("express-session")({
    secret: "2Lu75u4Sb&H&wA6Y",
    resave: true,
    store: store,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());

app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  if (req.user) req.user.isFirstTime = false;
  res.render("index", { currentUser: req.user });
});

app.get("/firstTimeUser", (req, res) => {
  res.render("index", { currentUser: req.user });
});
app.get("/user", isLoggedIn, (req, res) => {
  res.json(req.user);
});
app.get("/customLevels", isLoggedIn, (req, res) => {
  Level.find({ creator: ObjectId(req.user._id) }, (err, levels) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      res.send(levels);
    }
  });
});
app.patch("/level", isLoggedIn, (req, res) => {
  console.log(req.body);
  Level.findById(ObjectId(req.body.level._id), (err, level) => {
    console.log(req.body);
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      level.data = req.body.level.data;
      level.save((err) => {
        if (err) {
          console.log(err);
          res.send(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});
app.post("/level", isLoggedIn, (req, res) => {
  const level = new Level();
  level.isCustom = true;
  level.creator = ObjectId(req.user._id);
  const name = "Level" + Math.floor(Math.random() * 1000);
  level.data = {
    planet: "green",
    name: name,
    entities: [
      {
        type: "Player",
        posX: 100,
        posY: 100,
      },
    ],
  };
  level.save((error) => {
    if (error) {
      res.sendStatus(500);
    } else {
      res.send(level);
    }
  });
});

app.get("/levels", isLoggedIn, async (req, res) => {
  await Level.find({ isCustom: false })
    .then((levels) => res.send(levels))
    .catch((err) => console.error(err));
});
app.post("/register", (req, res) => {
  User.register(
    new User({
      username: req.body.username,
      email: req.body.email,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.send(err).sendStatus(500);
      }
      passport.authenticate("local")(req, res, () => {
        res.redirect("/firstTimeUser");
      });
    }
  );
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.redirect("/");
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

io.on("connection", (socket) => {
  socket.on("EventHappend", (data, callBack) => {});
});
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.sendStatus(401);
}
connectDb().then(() => {
  console.log("Connected To Database Server");
  levelSeeder().then(() => {
    console.log("Seeded Database");
    server.listen(5000, () => {
      console.log("Connected To Port 5000");
    });
  });
});
