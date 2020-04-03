import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class FocusC extends Component {
  constructor({ maxFocus, positionOnGUI = "left" }) {
    super(ComponentTypes.FOCUS);
    this.maxFocus = maxFocus;
    this.currentFocus = maxFocus;
    this.unlimitedFocus = false;
    // to Draw on GUI.
    this.positionOnGUI = positionOnGUI;
  }
}
