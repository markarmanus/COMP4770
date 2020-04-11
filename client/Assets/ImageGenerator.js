const createImage = (src) => {
  const image = new Image();
  image.src = src;
  return image;
};
const Images = {
  yoda: createImage("./Images/character.png"),
  floor: createImage("./Images/floor.png"),
  fullHealthBar: createImage("./Images/fullHealthBar.png"),
  emptyHealthBar: createImage("./Images/EmptyHealthBar.png"),
  fullFocusBar: createImage("./Images/FullFocusBar.png"),
  emptyFocusBar: createImage("./Images/EmptyFocusBar.png"),
  currency: createImage("./Images/currency.png"),
  currencyAnimated: createImage("./Images/currencyAnimated.png"),
};

export default Images;
