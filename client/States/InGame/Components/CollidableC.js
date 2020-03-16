import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class CollidableC extends Component {
  constructor(subSquareRatio) {
    super(ComponentTypes.COLLIDABLE);
    this.subSquareRatio = subSquareRatio;
    this.isGrounded = false;
  }
}
