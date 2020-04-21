const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String },
  currency: { type: Number, default: 0 },
  unlockedLevels: { type: Object, default: {} },
  levelsData: { type: Object, default: {} },
  isFirstTime: { type: Boolean, default: true },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
