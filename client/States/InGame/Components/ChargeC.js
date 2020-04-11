import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
import Vec2 from "../../../Vec2";
export default class CollidableC extends Component {
  constructor({ speed, location }) {
    super(ComponentTypes.CHARGE);
    this.speed = speed;
    this.location = location;
    this.speedVector = null;
  }
}
