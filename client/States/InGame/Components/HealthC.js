import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class ControllableC extends Component {
  constructor({ maxHealth, positionOnGUI = "left", folllowEntity = false }) {
    super(ComponentTypes.HEALTH);
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;
    this.unlimitedHealth = false;
    // to Draw on GUI.
    this.positionOnGUI = positionOnGUI;
    this.folllowEntity = folllowEntity;
  }
}
