import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class FocusC extends Component {
  constructor({ speed, offset = { x: 0, y: 0 }, entityToFollow, delay }) {
    super(ComponentTypes.FOLLOW);
    this.entityToFollow = entityToFollow;
    this.offset = offset;
    this.isActive = false;
    this.speed = speed;
    this.locationStack = [];
    this.delay = delay;
  }
}
