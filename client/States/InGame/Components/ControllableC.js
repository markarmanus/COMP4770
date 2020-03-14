import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class ControllableC extends Component {
  constructor(controlls) {
    super(ComponentTypes.CONTROLABLE);
    this.leftBttn = controlls.leftBttn;
    this.rightBttn = controlls.rightBttn;
    this.jumpBttn = controlls.jumpBttn;
    this.attack = controlls.attack;
    this.alternate = controlls.alternate;
    this.bttnsState = Object.values(controlls).reduce((acc, val) => {
      acc[val] = false;
      return acc;
    }, {});
  }
}
