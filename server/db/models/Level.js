const mongoose = require("mongoose");
const Types = mongoose.Types;
const ObjectId = Types.ObjectId;

const levelSchema = new mongoose.Schema({
  data: { type: Object, required: true, default: {} },
  isCustom: { type: Boolean, default: false },
  creator: { type: ObjectId },
});

module.exports = mongoose.model("Level", levelSchema);
