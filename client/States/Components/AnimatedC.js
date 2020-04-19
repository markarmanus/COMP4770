import ComponentTypes from "../../ComponentTypes";
import Component from "../../Component";
export default class AnimtedC extends Component {
  constructor({ animationSpeed, spritesCount, repeat }) {
    super(ComponentTypes.ANIMATED);
    this.animationSpeed = animationSpeed;
    this.spritesCount = spritesCount;
    this.currentFrame = -1;
    this.timer = new Date().getTime();
    this.isAnimating = true;
    this.repeat = repeat !== undefined ? repeat : true;
  }
}
