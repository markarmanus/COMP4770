import ComponentTypes from "../../ComponentTypes";
import Component from "../../Component";
export default class AnimtedC extends Component {
  constructor({ animationSpeed, imgSrc, spritesCount }) {
    super(ComponentTypes.ANIMATED);
    this.animationSpeed = animationSpeed;
    this.imgSrc = imgSrc;
    this.spritesCount = spritesCount;
    this.currentFrame = 0;
    this.timer = new Date().getTime();
  }
}
