import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class ShooterC extends Component {
  constructor({ fireRate, shootingOffset, accuracy, toShootAt }) {
    super(ComponentTypes.SHOOTER);
    this.shootingOffset = shootingOffset;
    this.fireRate = fireRate;
    this.toShootAt = toShootAt;
    this.lastShotTime = new Date().getTime();
    this.accuracy = accuracy;
  }
}
