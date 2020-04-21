import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class FocusC extends Component {
  constructor({ maxFocus, positionOnGUI = "left", timeToReGen }) {
    super(ComponentTypes.FOCUS);
    this.maxFocus = maxFocus;
    this.currentFocus = maxFocus;
    this.unlimitedFocus = false;
    this.lastFocus = this.currentFocus;
    this.timeToReGen = timeToReGen;
    this.timeSinceReGen = new Date().getTime();
    // to Draw on GUI.
    this.positionOnGUI = positionOnGUI;
  }
}
