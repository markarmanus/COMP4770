import EntityData from "../../Configuration/EntityData";
import ComponentTypes from "../../ComponentTypes";
import RenderableC from "../Components/RenderableC";
import AnimatedC from "../Components/AnimatedC";
import CollidableC from "../InGame/Components/CollidableC";
import ControllableC from "../InGame/Components/ControllableC";
import MovableC from "../InGame/Components/MovableC";
import MultiSpritesC from "../InGame/Components/MultiSpritesC";
import PhysicalC from "../InGame/Components/PhysicalC";

const ComponentClasses = {
  [ComponentTypes.RENDERABLE]: RenderableC,
  [ComponentTypes.ANIMATED]: AnimatedC,
  [ComponentTypes.CONTROLABLE]: ControllableC,
  [ComponentTypes.MOVABLE]: MovableC,
  [ComponentTypes.MULTI_SPRITES]: MultiSpritesC,
  [ComponentTypes.COLLIDABLE]: CollidableC,
  [ComponentTypes.PHYSICAL]: PhysicalC
};
export default class LevelManager {
  constructor(entityManger) {
    this.entityManger = entityManger;
  }
  loadLevel(level) {
    const entities = level.data.entities;
    for (let entity of entities) {
      const entityInstance = this.entityManger.addEntity(entity.type);
      const components = Object.entries(EntityData[entity.type]);
      for (let [component, properties] of components) {
        if (component == ComponentTypes.RENDERABLE) {
          properties = { posX: entity.posX, posY: entity.posY, ...properties };
        }
        const componentInstance = new ComponentClasses[component](properties);
        entityInstance.addComponent(componentInstance);
      }
    }
  }
}
