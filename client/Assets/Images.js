const createImage = src => {
  const image = new Image();
  image.src = src;
  return image;
};
const Images = {
  yoda: createImage("./character.png"),
  floor: createImage("./floor.png")
};

export default Images;
