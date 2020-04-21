import ComponentTypes from "../../ComponentTypes";
import Helper from "../../Helper";
const Effects = {
  Explosion: "Explosion",
  Smoke: "Smoke",
  SmallSmoke: "SmallSmoke",
};
class EffectsGenerator {
  static createEffect(type, entityManger, offset, parentEntity, scale = 1) {
    const entityInstance = Helper.generateEntity(type, entityManger);
    const renderC = entityInstance.components[ComponentTypes.RENDERABLE];
    const parentRenderC = parentEntity.components[ComponentTypes.RENDERABLE];
    renderC.scaledHeight = scale * renderC.height;
    renderC.scaledWidth = scale * renderC.width;
    const effectCenter = {
      x: renderC.scaledWidth / 2,
      y: renderC.scaledHeight / 2,
    };
    const startingPoint = {
      x: parentRenderC.posX + parentRenderC.scaledWidth * offset.x,
      y: parentRenderC.posY + parentRenderC.scaledHeight * offset.y,
    };

    if (renderC && parentRenderC) {
      renderC.posX = startingPoint.x - effectCenter.x;
      renderC.posY = startingPoint.y - effectCenter.y;
    }
  }
}
export { Effects, EffectsGenerator };
