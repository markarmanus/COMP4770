import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class SeekC extends Component {
  constructor({ fireRate, orbCost, fireBallCost }) {
    super(ComponentTypes.WEAPONS);
    this.lastShot = new Date().getTime();
    this.fireRate = fireRate;
    this.FireBallEntity;
    this.orbCost = orbCost;
    this.fireBallCost = fireBallCost;
  }
}
