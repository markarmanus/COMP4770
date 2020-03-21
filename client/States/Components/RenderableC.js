import ComponentTypes from "../../ComponentTypes";
import Component from "../../Component";
export default class RenderableC extends Component {
  constructor({ posX, posY, image, width = 32, height = 32, scale }) {
    super(ComponentTypes.RENDERABLE);
    this.posX = posX;
    this.posY = posY;
    this.image = image;
    this.imageCropX = 0;
    this.imageCropY = 0;
    this.width = width;
    this.height = height;
    this.scale = scale;
    this.scaledWidth = width * scale;
    this.scaledHeight = height * scale;
    this.lastPosX = posX;
    this.lastPosY = posY;
  }
}
