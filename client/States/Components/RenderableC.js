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
    rotation,
    alpha,
    blocksView,
    offset = { x: 1, y: 1 },
    imageCropY = 0,
    shadowEffect = false,
    imageCropX = 0,
    visionOffset,
  }) {
    super(ComponentTypes.RENDERABLE);
    this.posX = posX;
    this.posY = posY;
    this.shadowEffect = shadowEffect;
    this.rotation = rotation;
    this.alpha = alpha;
    this.image = image;
    this.imageCropX = imageCropX;
    this.imageCropY = imageCropY;
    this.isOnScree = true;
    this.shouldRender = true;
    this.width = width;
    this.offset = offset;
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
