import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class PhysicalC extends Component {
  constructor({ airFriction, maxGravity }) {
    super(ComponentTypes.PHYSICAL);
    this.airFriction = airFriction;
    this.currentGravityForce = 0;
    this.maxGravity = maxGravity;
  }
}
