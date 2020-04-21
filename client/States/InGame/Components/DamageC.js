import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class DamageC extends Component {
  constructor({ damage }) {
    super(ComponentTypes.DAMAGE);
    this.damage = damage;
    this.multiplier = 1;
  }
}
