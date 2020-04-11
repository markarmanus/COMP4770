import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class LifeTimeC extends Component {
  constructor({ lifeTime }) {
    super(ComponentTypes.LIFE_TIME);
    this.lifeTime = lifeTime;
    this.timeAlive = new Date().getTime();
  }
}
