import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class MovableC extends Component {
  constructor(velocity, maxVelocity, friction, accerlationSpeed) {
    super(ComponentTypes.MOVABLE);
    this.velocity = velocity;
    this.maxVelocity = maxVelocity;
    this.friction = friction;
    this.currentVelocity = 0;
    this.accerlationSpeed = accerlationSpeed;
  }
}
