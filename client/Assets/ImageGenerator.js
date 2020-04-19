const createImage = (src) => {
  const image = new Image();
  image.src = src;
  return image;
};
const Images = {
  yoda: createImage("./Images/babyYodaNew.png"),
  selectorBackground: createImage("./Images/selectorBackground.png"),
  floor: createImage("./Images/floor.png"),
  fullHealthBar: createImage("./Images/fullHealthBar.png"),
  emptyHealthBar: createImage("./Images/EmptyHealthBar.png"),
  emptySmallHealthBar: createImage("./Images/EmptySmallHealthBar.png"),
  fullSmallHealthBar: createImage("./Images/FullSmallHealthBar.png"),
  fullFocusBar: createImage("./Images/FullFocusBar.png"),
  emptyFocusBar: createImage("./Images/EmptyFocusBar.png"),
  currency: createImage("./Images/currency.png"),
  currencyAnimated: createImage("./Images/coinSpinning.png"),
  campFireOff: createImage("./Images/CampFireOff.png"),
  campFireOn: createImage("./Images/CampFireOn.png"),
  forceField: createImage("./Images/blueFireball.png"),
  mainMenu: createImage("./Images/pauseMenu.png"),
  continue: createImage("./Images/continue.png"),
  exit: createImage("./Images/exit.png"),
  emptyCrib: createImage("./Images/emptyCrib.png"),
  drone: createImage("./Images/drone.png"),
  laserBullet: createImage("./Images/laserBullet.png"),
  stormtrooper: createImage("./Images/stormtrooperNEW"),
  orb: createImage("./Images/blueShootingOrb.png"),
  explosion: createImage("./Images/explode.png"),
  redPlanet: createImage("./Images/Planets/redPlanet128.png"),
  bluePlanet: createImage("./Images/Planets/bluePlanet128.png"),
  greenPlanet: createImage("./Images/Planets/greenPlanet128.png"),
  pinkPlanet: createImage("./Images/Planets/pinkPlanet128.png"),
  overworldYoda: createImage("./Images/yodaCrib.png"),
  coruscantText: createImage("./Images/coruscant.png"),
  nabooText: createImage("./Images/NabooText.png"),
  levelEditor: createImage("./Images/levelEditor.png"),
  orondia: createImage("./Images/orondia.png")
};

export default Images;
