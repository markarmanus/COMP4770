import ComponentTypes from "./../../../ComponentTypes";
export default class CheckPointS {
  constructor(entityManager, levelManager) {
    this.entityManager = entityManager;
    this.levelManager = levelManager;
  }

  update() {
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      const checkPointC = entity.components[ComponentTypes.CHECKPOINT];
      if (checkPointC && checkPointC.loadLastCheckPoint) {
        checkPointC.loadLastCheckPoint = false;
        this.levelManager.loadCheckPoint(checkPointC.lastCheckPoint);
        return;
      }
    }
  }
}
