import ComponentTypes from "../../ComponentTypes";
import Component from "../../Component";
export default class RenderableC extends Component {
  constructor(
    initPosX,
    initPosY,
    width,
    height,
    imgSrc,
    imageWidth = 32,
    imageHeight = 32
  ) {
    super(ComponentTypes.RENDERABLE);
    this.posX = initPosX;
    this.width = width;
    this.height = height;
    this.posY = initPosY;
    this.image = imgSrc;
    this.imageCropX = 0;
    this.imageCropY = 0;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
  }
}
