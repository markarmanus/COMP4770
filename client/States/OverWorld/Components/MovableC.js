import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class MovableC extends Component {
  constructor({
    velocity,
    maxVelocity,
    accerlationSpeed,
    friction,

  }) {
    super(ComponentTypes.MOVABLE);
    // here you will have all the data that you will
    // need to make baby yoda move from planet to planet
    this.velocity = velocity;
    this.maxVelocity = maxVelocity;
    this.friction = friction;
    this.currentVelocity = 0;
    this.accerlationSpeed = accerlationSpeed;
  }
}
