const createImage = (src) => {
  const image = new Image();
  image.src = src;
  return image;
};
const Images = {
  Yoda: createImage("./Images/Yoda.png"),
  redFloor: createImage("./Images/redFloor.png"),
  blueFloor: createImage("./Images/blueFloor.png"),
  greenFloor: createImage("./Images/greenFloor.png"),
  FullHealthBar: createImage("./Images/FullHealthBar.png"),
  EmptyHealthBar: createImage("./Images/EmptyHealthBar.png"),
  EmptySmallHealthBar: createImage("./Images/EmptySmallHealthBar.png"),
  FullSmallHealthBar: createImage("./Images/FullSmallHealthBar.png"),
  FullFocusBar: createImage("./Images/FullFocusBar.png"),
  EmptyFocusBar: createImage("./Images/EmptyFocusBar.png"),
  Currency: createImage("./Images/Currency.png"),
  CampFireOff: createImage("./Images/CampFireOff.png"),
  CampFireOn: createImage("./Images/CampFireOn.png"),
  FireBall: createImage("./Images/FireBall.png"),
  PauseMenu: createImage("./Images/PauseMenu.png"),
  Continue: createImage("./Images/Continue.png"),
  Exit: createImage("./Images/Exit.png"),
  EmptyCrib: createImage("./Images/EmptyCrib.png"),
  Drone: createImage("./Images/Drone.png"),
  LaserBullet: createImage("./Images/LaserBullet.png"),
  StormTrooper: createImage("./Images/Stormtrooper"),
  Orb: createImage("./Images/Orb.png"),
  Explosion: createImage("./Images/Explosion.png"),
  redBg: createImage("./Images/Planets/Backgrounds/redBg.png"),
  blueBg: createImage("./Images/Planets/Backgrounds/blueBg.png"),
  greenBg: createImage("./Images/Planets/Backgrounds/greenBg.png"),
  Arrow: createImage("./Images/Arrow.png"),
  Carrot: createImage("./Images/Carrot.png"),
  Chest: createImage("./Images/Chest.png"),
  Chicken: createImage("./Images/Chicken.png"),
  Clover: createImage("./Images/Clover.png"),
  CoinPile: createImage("./Images/CoinPile.png"),
  Mandalorian: createImage("./Images/Mandalorian.png"),
  MandalorianCaged: createImage("./Images/MandalorianCaged.png"),
  Mushroom: createImage("./Images/Mushroom.png"),
  Ring: createImage("./Images/Ring.png"),
  Scroll: createImage("./Images/Scroll.png"),
  SmallSmoke: createImage("./Images/SmallSmoke.png"),
  Spike: createImage("./Images/Spike.png"),
  StormTrooperCar: createImage("./Images/StormTrooperCar.png"),
  Sword: createImage("./Images/Sword.png"),
  Timer: createImage("./Images/Timer.png"),
  Smoke: createImage("./Images/Smoke.png"),
  CurrencyImage: createImage("./Images/CurrencyImage.png"),
  Glass: createImage("./Images/Glass.png"),
  IceFloor: createImage("./Images/IceFloor.png"),
  LavaFloor: createImage("./Images/LavaFloor.png"),
  MudFloor: createImage("./Images/MudFloor.png"),
  MessageScroll: createImage("./Images/MessageScroll.png"),
  YodaCrib: createImage("./Images/YodaCrib.png"),
  PinkPlanet: createImage("./Images/Planets/pinkPlanet128.png"),
  BluePlanet: createImage("./Images/Planets/bluePlanet128.png"),
  GreenPlanet: createImage("./Images/Planets/greenPlanet128.png"),
  RedPlanet: createImage("./Images/Planets/redPlanet128.png"),
  OverWorldYoda: createImage("./Images/YodaCrib.png"),
  CoruscantText: createImage("./Images/coruscant.png"),
  NabooText: createImage("./Images/NabooText.png"),
  LevelEditorText: createImage("./Images/LevelEditorText.png"),
  Orondia: createImage("./Images/orondia.png"),
};

export default Images;
