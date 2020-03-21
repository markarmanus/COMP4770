const Level = require("../models/Level");
const levels = [
  {
    data: {
      entities: [
        { posX: 100, posY: 500, type: "Player" },
        { posX: 0, posY: 700, type: "Floor" },
        { posX: 32, posY: 700, type: "Floor" },
        { posX: 64, posY: 700, type: "Floor" },
        { posX: 96, posY: 700, type: "Floor" },
        { posX: 128, posY: 700, type: "Floor" },
        { posX: 160, posY: 700, type: "Floor" },
        { posX: 192, posY: 700, type: "Floor" },
        { posX: 224, posY: 700, type: "Floor" },
        { posX: 256, posY: 700, type: "Floor" },
        { posX: 288, posY: 700, type: "Floor" },
        { posX: 320, posY: 700, type: "Floor" },
        { posX: 352, posY: 700, type: "Floor" }
      ]
    }
  },
  {
    data: {
      entities: [{ posX: 0, posY: 500, type: "Floor" }]
    }
  }
];

module.exports = levelSeeder = () => {
  Level.deleteMany({ isCustom: false }, err => {
    if (err) console.error(err);
  });
  Level.insertMany(levels, err => {
    if (err) console.error(err);
  });
};
