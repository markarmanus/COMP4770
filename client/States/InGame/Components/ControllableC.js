import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class ControllableC extends Component {
  constructor(controlls, speed) {
    super(ComponentTypes.CONTROLABLE);
    this.leftBttn = controlls.leftBttn;
    this.rightBttn = controlls.rightBttn;
    this.jumpBttn = controlls.jumpBttn;
    this.attack = controlls.attack;
    this.alternate = controlls.alternate;
    this.speed = speed;
  }
}
