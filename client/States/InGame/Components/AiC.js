import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class AiC extends Component {
  constructor({ AItype }) {
    super(ComponentTypes.AI);
    this.AItype = AItype;
  }
}
