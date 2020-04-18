import ComponentTypes from "../../ComponentTypes";
import Helper from "./Helper";
import EntityManager from "../../EntityManager";
import Images from "../../Assets/ImageGenerator";
export default class LevelManager {
  constructor(entityManager, cameraS, level) {
    this.entityManager = entityManager;
    this.cameraS = cameraS;
    this.level = level;
  }
  
  loadCheckPoint(checkPoint) {
    const oldManager = this.entityManager;

    this.entityManager = new EntityManager();
    this.loadLevel();
    const initialEntities = this.entityManager.getNewEntities();
    for (const initialEntity of initialEntities) {
      const renderC = initialEntity.components[ComponentTypes.RENDERABLE];
      if (renderC) {
        const shouldRemove =
          renderC &&
          renderC.posX < checkPoint.x &&
          (initialEntity.descriptor === "Currency" ||
            initialEntity.descriptor === "PickUp");
        if (initialEntity.descriptor === "Player") {
          const checkPointC =
            initialEntity.components[ComponentTypes.CHECKPOINT];
          const currencyC = initialEntity.components[ComponentTypes.CURRENCY];
          currencyC.currentCurrency = checkPoint.currency;
          checkPointC.lastCheckPoint = checkPoint;
          renderC.posX = checkPoint.x;
          renderC.posY = checkPoint.y - 32;
        }
        if (shouldRemove) {
          initialEntity.remove();
        }
        if (initialEntity.descriptor === "CheckPoint") {
          renderC.image = Images.campFireOn;
          renderC.height = Images.campFireOn.naturalHeight;
        }
      }
    }
    oldManager.setEntities([]);
    oldManager.setNewEntities(this.entityManager.getNewEntities());
    oldManager.setEntityCount(this.entityManager.getEntityCount());
    this.entityManager = oldManager;
  }
  loadLevel() {
    const entities = this.level.data.entities;
    let player;
    for (let entity of entities) {
      const entityInstance = Helper.generateEntity(
        entity.type,
        this.entityManager
      );
      const renderC = entityInstance.components[ComponentTypes.RENDERABLE];
      if (renderC) {
        renderC.posX = entity.posX;
        renderC.posY = entity.posY;
      }
      if (entity.type === "Player") {
        player = entityInstance;
      }
    }
    if (player) {
      this.cameraS.follow(player);
      const checkPointC = player.components[ComponentTypes.CHECKPOINT];
      const renderC = player.components[ComponentTypes.RENDERABLE];
      const currencyC = player.components[ComponentTypes.CURRENCY];
      if (checkPointC) {
        checkPointC.lastCheckPoint = {
          x: renderC.posX,
          y: renderC.posY,
          currency: currencyC.currentCurrency,
        };
      }
    }
  }
}
