const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String },
  imperialCredits: { type: Number, default: 0 },
  unlockedLevels: { type: Array, default: [] },
  unlockedPowers: { type: Array, default: [] },
  levelsData: { type: Object, default: {} },
  settings: { type: Object, default: {} },
  properties: { type: Object, default: {} }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
