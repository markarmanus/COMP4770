import ComponentTypes from "../../ComponentTypes";
import Helper from "./Helper";
const Effects = {
  explosion: "Explosion",
};
class EffectsGenerator {
  static createEffect(type, entityManger, offset, parentEntity, follow) {
    const entityInstance = Helper.generateEntity(type, entityManger);
    const renderC = entityInstance.components[ComponentTypes.RENDERABLE];
    const parentRenderC = parentEntity.components[ComponentTypes.RENDERABLE];
    if (renderC && parentRenderC) {
      renderC.posX = parentRenderC.posX - offset.x;
      renderC.posY = parentRenderC.posY - offset.y;
    }
  }
}
export { Effects, EffectsGenerator };
