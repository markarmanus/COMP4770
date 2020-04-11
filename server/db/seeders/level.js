const Level = require("../models/Level");

let levels = [
  {
    data: {
      entities: [
        { posX: 100, posY: 500, type: "Player" },

        { posX: 0, posY: 700, type: "Floor" },
        { posX: 300, posY: 500, type: "StormTropper" },
        { posX: 300, posY: 500, type: "StormTropper" },
      ],
    },
  },
  {
    data: {
      entities: [{ posX: 0, posY: 500, type: "Floor" }],
    },
  },
];
for (let i = 1; i < 100; i++) {
  levels[0].data.entities.push({
    posX: i * 32,
    posY: 700,
    type: "Floor",
  });
  levels[0].data.entities.push({
    posX: (i + 10) * 32,
    posY: 550,
    type: "Floor",
  });
  levels[0].data.entities.push({
    posX: (i + 20) * 32,
    posY: 400,
    type: "Floor",
  });
  if (i % 2 == 0) {
    levels[0].data.entities.push({
      posX: i * 32,
      posY: 630,
      type: "Currency",
    });
    levels[0].data.entities.push({
      posX: (i + 10) * 32,
      posY: 480,
      type: "Currency",
    });
    levels[0].data.entities.push({
      posX: (i + 20) * 32,
      posY: 330,
      type: "Currency",
    });
  }
}
console.log(levels[0].data.entities);

module.exports = levelSeeder = async () => {
  return new Promise((resolve) => {
    Level.deleteMany({ isCustom: false }, (err) => {
      if (err) console.error(err);
      Level.insertMany(levels, (err) => {
        if (err) console.error(err);
        return resolve();
      });
    });
  });
};
