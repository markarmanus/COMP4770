import ComponentTypes from "./../../../ComponentTypes";
import Sounds from "../../../Assets/SoundGenerator";
import { EffectsGenerator, Effects } from "../EffectsGenerator";
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
            Sounds.Death().play();
            this.killPlayer(entity);
          } else {
            if (entity.descriptor === "Drone") {
              Sounds.Explosion().play();
              EffectsGenerator.createEffect(
                Effects.Explosion,
                this.entityManager,
                { x: 0.5, y: 0.5 },
                entity
              );
            }
            if (entity.descriptor === "StormTrooper") {
              EffectsGenerator.createEffect(
                Effects.Smoke,
                this.entityManager,
                { x: 0.5, y: 1 },
                entity,
                1
              );
            }
            entity.remove();
          }
        }
      }
    }
  }
}
