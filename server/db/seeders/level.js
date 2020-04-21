const Level = require("../models/Level");

let levels = [
  {
    data: {
      planet: "red",
      entities: [
        { posX: 128, posY: 480, type: "Player" },

        { posX: 800, posY: 300, type: "Drone" },
        { posX: 2000, posY: 200, type: "StormTrooper" },
        { posX: 800, posY: 400, type: "EmptyCrib" },
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
    posY: 672,
    type: "Floor",
  });
  levels[0].data.entities.push({
    posX: (i + 10) * 32,
    posY: 448,
    type: "Floor",
  });

  if (i % 2 == 0) {
    levels[0].data.entities.push({
      posX: i * 32,
      posY: 608,
      type: "Currency",
    });
  }
  //   levels[0].data.entities.push({
  //     posX: (i + 10) * 32,
  //     posY: 384,
  //     type: "Currency",
  //   });
  // }
}

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
