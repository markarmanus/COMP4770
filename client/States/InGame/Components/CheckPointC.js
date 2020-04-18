import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class CheckPointC extends Component {
  constructor() {
    super(ComponentTypes.CHECKPOINT);
    this.lastCheckPointEntityManager;
    this.loadLastCheckPoint = false;
  }
}
