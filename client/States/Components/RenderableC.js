import ComponentTypes from "../../ComponentTypes";
import Component from "../../Component";
export default class RenderableC extends Component {
  constructor(initPosX, initPosY, imgSrc, width = 32, height = 32, scale) {
    super(ComponentTypes.RENDERABLE);
    this.posX = initPosX;
    this.posY = initPosY;
    this.image = imgSrc;
    this.imageCropX = 0;
    this.imageCropY = 0;
    this.width = width;
    this.height = height;
    this.scale = scale;
    this.scaledWidth = width * scale;
    this.scaledHeight = height * scale;
    this.lastPosX = initPosX;
    this.lastPosY = initPosY;
  }
}
