import ComponentTypes from "../../ComponentTypes";
import Component from "../../Component";
export default class ControllableC extends Component {
  constructor(controlls) {
    super(ComponentTypes.CONTROLABLE);
    this.leftBttn = controlls.leftBttn;
    this.rightBttn = controlls.rightBttn;
    this.jumpBttn = controlls.jumpBttn;
    this.upBttn = controlls.upBttn;
    this.downBttn = controlls.downBttn;
    this.bttnsState = Object.values(controlls).reduce((acc, val) => {
      acc[val] = false;
      return acc;
    }, {});
    this.bttnsHoldState = Object.assign({}, this.bttnsState);
    this.bttnsDblClickState = Object.assign({}, this.bttnsState);
    this.mouseState = {
      leftClick: false,
      rightClick: false,
    };
  }
}
