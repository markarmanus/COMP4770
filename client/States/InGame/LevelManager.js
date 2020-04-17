
import ComponentTypes from "../../ComponentTypes";
import Helper from "./Helper"
export default class LevelManager {
  constructor(entityManger, cameraS) {
    this.entityManger = entityManger;
    this.cameraS = cameraS;
  }
  loadLevel(level) {
    const entities = level.data.entities;
    for (let entity of entities) {
      const entityInstance = Helper.generateEntity(entity.type, this.entityManger);
      const renderC = entityInstance.components[ComponentTypes.RENDERABLE];
      if (renderC) {
        renderC.posX = entity.posX;
        renderC.posY = entity.posY;
      }
      if (entity.type === "Player") this.cameraS.follow(entityInstance);
    }
    console.log(this.entityManger)
  }
}
