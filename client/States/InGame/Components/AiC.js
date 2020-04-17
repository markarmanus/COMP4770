import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class AiC extends Component {
  constructor({ AIType, properties, recognitionSpeed }) {
    super(ComponentTypes.AI);
    this.AIType = AIType;
    this.recognitionSpeed = recognitionSpeed;
    this.lastActionTime = new Date().getTime();
    this.properties = properties;
    this.lastAction = "cantSee";
    this.lastSawTime = new Date().getTime();

  }
}
