import ComponentClasses from "./Configuration/ComponentClasses";
import EntityData from "../../Configuration/EntityData";
import ComponentTypes from "../../ComponentTypes";

const Effects = {
  explosion: EntityData.Explosion,
};
class EffectsGenerator {
  static createEffect(entytData, entityManger, offset, parentEntity, follow) {
    const entityInstance = entityManger.addEntity("Effect");
    const components = Object.entries(entytData);
    for (let [component, properties] of components) {
      if (component == ComponentTypes.RENDERABLE) {
        const renderC = parentEntity.components[ComponentTypes.RENDERABLE];
        if (follow) {
          //TODO MAKE FOLLOW LOGIC By ADDING FOLLOWC
        }
        properties = {
          posX: renderC.posX - offset.x,
          posY: renderC.posY - offset.y,
          ...properties,
        };
      }
      const componentInstance = new ComponentClasses[component](properties);
      entityInstance.addComponent(componentInstance);
    }
  }
}
export { Effects, EffectsGenerator };
