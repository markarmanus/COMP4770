const createImage = src => {
  const image = new Image();
  image.src = src;
  return image;
};
const Images = {
  yoda: createImage("./character.png"),
  floor: createImage("./floor.png"),
  fullHealthBar: createImage("./fullHealthBar.png"),
  emptyHealthBar: createImage("./EmptyHealthBar.png"),
  fullFocusBar: createImage("./FullFocusBar.png"),
  emptyFocusBar: createImage("./EmptyFocusBar.png"),
  currency: createImage("./currency.png"),
  currencyAnimated: createImage("./currencyAnimated.png")
};

export default Images;
