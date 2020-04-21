const createSound = (src, type, repeat) => {
  let sound = document.createElement("audio");
  sound.src = src;
  sound.setAttribute("preload", "auto");
  sound.setAttribute("controls", "none");
  sound.style.display = "none";
  sound.muted = false;
  sound.loop = repeat;
  sound.volume = Volumes[type];
  sound.onended = () => {
    sound.parentNode.removeChild(sound);
  };
  document.body.appendChild(sound);
  return sound;
};
const Volumes = {
  Explosion: 1,
  redPlanetMusic: 0.5,
  bluePlanetMusic: 0.5,
  greenPlanetMusic: 0.5,
  Boss: 1,
  CoinPickUp: 0.05,
  Death: 0.5,
  FireBall: 0.05,
  Jump: 1,
  LaserSound: 0.05,
  OrbSound: 0.2,
  Dash: 0.2,
};
const Sounds = {
  Explosion: (repeat) =>
    createSound("./Sounds/Explosion.mp3", "Explosion", repeat),
  redPlanetMusic: (repeat) =>
    createSound("./Sounds/Desert.mp3", "redPlanetMusic", repeat),
  bluePlanetMusic: (repeat) =>
    createSound("./Sounds/Snow.mp3", "bluePlanetMusic", repeat),
  greenPlanetMusic: (repeat) =>
    createSound("./Sounds/Land.mp3", "greenPlanetMusic", repeat),
  Boss: (repeat) => createSound("./Sounds/Boss.mp3", "Boss", repeat),
  CoinPickUp: (repeat) =>
    createSound("./Sounds/CoinPickUp.mp3", "CoinPickUp", repeat),
  Death: (repeat) => createSound("./Sounds/Death.mp3", "Death", repeat),
  FireBall: (repeat) =>
    createSound("./Sounds/FireBall.mp3", "FireBall", repeat),
  Jump: (repeat) => createSound("./Sounds/Jump.mp3", "Jump", repeat),
  LaserSound: (repeat) =>
    createSound("./Sounds/LaserSound.mp3", "LaserSound", repeat),
  OrbSound: (repeat) =>
    createSound("./Sounds/OrbSound.mp3", "OrbSound", repeat),
  Dash: (repeat) => createSound("./Sounds/Dash.mp3", "OrbSound", repeat),
};

export default Sounds;
