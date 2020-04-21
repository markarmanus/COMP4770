import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class SeekC extends Component {
  constructor({
    fireRate,
    orbCost,
    fireBallCost,
    damageMultiplier,
    orbPenetration,
  }) {
    super(ComponentTypes.WEAPONS);
    this.lastShot = new Date().getTime();
    this.fireRate = fireRate;
    this.FireBallEntity;
    this.orbCost = orbCost;
    this.fireBallCost = fireBallCost;
    this.damageMultiplier = damageMultiplier;
    this.orbPenetration = orbPenetration
  }
}
