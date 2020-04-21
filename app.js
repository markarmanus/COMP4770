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
  // req.user.isFirstTime = false;
  console.log(req.user);
  res.render("index", { currentUser: req.user });
});
app.get("/user", isLoggedIn, (req, res) => {
  res.json(req.user);
});
app.post("/level", isLoggedIn, (req, res) => {});
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
