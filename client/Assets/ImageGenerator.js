const createImage = (src) => {
  const image = new Image();
  image.src = src;
  return image;
};
const Images = {
  yoda: createImage("./Images/character.png"),
  selectorBackground: createImage("./Images/selectorBackground.png"),
  floor: createImage("./Images/floor.png"),
  fullHealthBar: createImage("./Images/fullHealthBar.png"),
  emptyHealthBar: createImage("./Images/EmptyHealthBar.png"),
  emptySmallHealthBar: createImage("./Images/EmptySmallHealthBar.png"),
  fullSmallHealthBar: createImage("./Images/FullSmallHealthBar.png"),
  fullFocusBar: createImage("./Images/FullFocusBar.png"),
  emptyFocusBar: createImage("./Images/EmptyFocusBar.png"),
  currency: createImage("./Images/currency.png"),
  currencyAnimated: createImage("./Images/currencyAnimated.png"),
  campFireOff: createImage("./Images/CampFireOff.png"),
  campFireOn: createImage("./Images/CampFireOn.png"),
  forceField: createImage("./Images/blueFireball.png"),
  mainMenu: createImage("./Images/pauseMenu.png"),
  continue: createImage("./Images/continue.png"),
  exit: createImage("./Images/exit.png"),
  emptyCrib: createImage("./Images/emptyCrib.png"),
};

export default Images;
