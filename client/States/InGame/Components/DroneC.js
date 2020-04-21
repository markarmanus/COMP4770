import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class DroneC extends Component {
  constructor({ speed, toAttack, maxSpeed, offset, accerlation }) {
    super(ComponentTypes.DRONE);
    this.speed = speed;
    this.toAttack = toAttack;
    this.maxSpeed = maxSpeed;
    this.offset = offset;
    this.path;
    this.accerlation = accerlation;
  }
}
