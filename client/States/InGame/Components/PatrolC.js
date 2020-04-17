import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class PatrolC extends Component {
  constructor({ speed, direction = { x: 1, y: 0 } }) {
    super(ComponentTypes.PATROL);
    this.speed = speed;
    this.direction = direction;
  }
}
