import ComponentTypes from "../../ComponentTypes";
import RenderC from "../Components/RenderableC";
import AnimatedC from "../Components/AnimatedC";
import EntityData from "../../Configuration/EntityData";

export default class LevelManager {
  constructor(entityManger) {
    this.entityManger = entityManger;
  }
  loadLevel(level) {
    const entities = level.data.entities;
    for (let entity of entities) {
      const entityInstance = this.entityManger.addEntity(entity.type);
      let renderProperties = EntityData[entity.type][ComponentTypes.RENDERABLE];
      renderProperties.posX = entity.posX;
      renderProperties.posY = entity.posY;
      console.log(renderProperties);
      const rendeC = new RenderC(renderProperties);
      entityInstance.addComponent(rendeC);
    }
  }
}
