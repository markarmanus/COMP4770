import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class SeekC extends Component {
  constructor({ shootingSpeed, fieldRadius }) {
    super(ComponentTypes.WEAPONS);
    this.shootingSpeed = shootingSpeed;
    this.fieldRadius = fieldRadius;
    this.lastShot = new Date().getTime();
    this.fireRate = 100;
    this.bulletLifeTime = 500;
  }
}
