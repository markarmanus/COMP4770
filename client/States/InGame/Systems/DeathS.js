import ComponentTypes from "./../../../ComponentTypes";
export default class DeathS {
  constructor(entityManager, cameraLimit) {
    this.entityManager = entityManager;
    this.cameraLimit = cameraLimit;
  }
  killPlayer(entity) {
    const checkPointC = entity.components[ComponentTypes.CHECKPOINT];
    if (checkPointC) checkPointC.loadLastCheckPoint = true;
  }
  update() {
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      const lifeTimeC = entity.components[ComponentTypes.LIFE_TIME];
      const healthC = entity.components[ComponentTypes.HEALTH];
      const renderC = entity.components[ComponentTypes.RENDERABLE];

      if (lifeTimeC) {
        if (lifeTimeC.lifeTime === "animationCycle") {
          const animationC = entity.components[ComponentTypes.ANIMATED];
          if (animationC && !animationC.isAnimating) {
            entity.remove();
          }
        } else {
          if (new Date().getTime() - lifeTimeC.timeAlive > lifeTimeC.lifeTime) {
            entity.remove();
          }
        }
      }
      if (healthC) {
        if (
          healthC.currentHealth < 0 ||
          (renderC &&
            renderC.posY - canvas.height > this.cameraLimit.min.y * -1)
        ) {
          if (entity.descriptor === "Player") {
            this.killPlayer(entity);
          } else {
            entity.remove();
          }
        }
      }
    }
  }
}
