import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class PickUpC extends Component {
  constructor({ componentsToChange, pickUpType }) {
    super(ComponentTypes.PICK_UP);
    this.pickUpType = pickUpType;
    this.componentsToChange = componentsToChange;
    this.wasPickedUp = false;
    this.pickedUpBy;
  }
}
