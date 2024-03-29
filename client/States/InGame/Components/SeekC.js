import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class SeekC extends Component {
  constructor({
    maxSpeed,
    speed,
    entityToSeek,
    accerlation,
    offset = { x: 0, y: 0 },
    locationToSeek,
  }) {
    super(ComponentTypes.SEEK);
    this.speed = speed;
    this.currentSpeed = 0;
    this.entityToSeek = entityToSeek;
    this.locationToSeek = locationToSeek;
    this.accerlation = accerlation;
    this.maxSpeed = maxSpeed;
    this.isSeeking = true;
    this.offset = offset;
  }
}
