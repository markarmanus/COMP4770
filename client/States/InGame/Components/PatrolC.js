import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class PatrolC extends Component {
  constructor({ speed }) {
    super(ComponentTypes.PATROL);
    this.speed = speed;
    this.direction = { x: 1, y: 0 };
  }
}
