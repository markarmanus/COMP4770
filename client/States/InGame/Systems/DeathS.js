import ComponentTypes from "./../../../ComponentTypes";
export default class DeathS {
  constructor() {}

  update(entityManager) {
    const entities = entityManager.getEntities();
    for (const entity of entities) {
      if (entity.components[ComponentTypes.LIFE_TIME]) {
        const lifeTimeC = entity.components[ComponentTypes.LIFE_TIME];
        if (lifeTimeC.lifeTime === "animationCycle") {
          const animationC = entity.components[ComponentTypes.ANIMATED];
          if (animationC && !animationC.isAnimating) {
            entity.remove();
          }
        } else {
          if (lifeTimeC.timeAlive > lifeTimeC.lifeTime) {
            entity.remove();
          }
        }
      }
    }
  }
}
