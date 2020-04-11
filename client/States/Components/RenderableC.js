import ComponentTypes from "../../ComponentTypes";
import Component from "../../Component";
export default class RenderableC extends Component {
  constructor({
    posX,
    posY,
    image,
    width = 32,
    height = 32,
    scale,
    blocksView,
    visionOffset,
  }) {
    super(ComponentTypes.RENDERABLE);
    this.posX = posX;
    this.posY = posY;
    this.image = image;
    this.imageCropX = 0;
    this.imageCropY = 0;
    this.isOnScree = true;
    this.width = width;
    this.height = height;
    this.scale = scale;
    this.scaledWidth = width * scale;
    this.scaledHeight = height * scale;
    this.lastPosX = posX;
    this.lastPosY = posY;
    this.blocksView = blocksView !== undefined ? blocksView : false;
    // defines where the eyes of entity are, to draw line of sight.
    this.visionOffset = visionOffset;
  }
}
