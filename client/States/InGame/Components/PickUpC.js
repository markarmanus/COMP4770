import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class PickUpC extends Component {
  constructor({ componentsToChange, pickUpType, lifeTime }) {
    super(ComponentTypes.PICK_UP);
    this.pickUpType = pickUpType;
    this.componentsToChange = componentsToChange;
    this.wasPickedUp = false;
    this.pickedUpBy;
    this.lifeTime = lifeTime;
    this.timeAlive;
    this.oldValues = {};
  }
}
