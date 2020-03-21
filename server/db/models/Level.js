const mongoose = require("mongoose");

const levelSchema = new mongoose.Schema({
  data: { type: Object, required: true, default: {} },
  isCustom: { type: Boolean, default: false }
});

module.exports = mongoose.model("Level", levelSchema);
