import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class CurrencyC extends Component {
  constructor({ currentCurrency, positionOnGUI = "top" }) {
    super(ComponentTypes.CURRENCY);
    this.currentCurrency = currentCurrency;
    // to Draw on GUI.
    this.positionOnGUI = positionOnGUI;
  }
}
