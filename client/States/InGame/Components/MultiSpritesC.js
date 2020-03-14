import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class MultiSpritesC extends Component {
  constructor(sprites) {
    super(ComponentTypes.MULTI_SPRITES);
    this.sprites = sprites;
  }
}
