import ComponentClasses from "./Configuration/ComponentClasses";
import EntityData from "../../Configuration/EntityData";
import ComponentTypes from "../../ComponentTypes";

export default class LevelManager {
  constructor(entityManger, cameraS) {
    this.entityManger = entityManger;
    this.cameraS = cameraS;
  }
  loadLevel(level) {
    const entities = level.data.entities;
    for (let entity of entities) {
      const entityInstance = this.entityManger.addEntity(entity.type);
      if (entity.type === "Player") this.cameraS.follow(entityInstance);
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
