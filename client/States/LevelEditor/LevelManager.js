import ComponentTypes from "../../ComponentTypes";
import RenderC from "../Components/RenderableC";
import AnimatedC from "../Components/AnimatedC";
import EntityData from "../../Configuration/EntityData";
import Images from "../../Assets/ImageGenerator";
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
      if (entity.type === "Floor") {
        renderProperties.image = Images[`${level.data.planet}Floor`];
      }
      const renderC = new RenderC(renderProperties);

      entityInstance.addComponent(renderC);
      if (EntityData[entity.type][ComponentTypes.ANIMATED]) {
        let animationProperties =
          EntityData[entity.type][ComponentTypes.ANIMATED];
        const animationC = new AnimatedC(animationProperties);
        entityInstance.addComponent(animationC);
      }
    }
  }
}
