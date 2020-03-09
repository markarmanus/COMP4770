import ComponentTypes from "../../ComponentTypes";
import Component from "../../Component";
export default class RenderableC extends Component {
  constructor(
    initPosX,
    initPosY,
    width,
    height,
    imgSrc,
    speedX = 0,
    speedY = 0
  ) {
    super(ComponentTypes.RENDERABLE);
    this.posX = initPosX;
    this.width = width;
    this.height = height;
    this.posY = initPosY;
    this.speedX = speedX;
    this.speedY = speedY;
    this.image = imgSrc;
  }
}
