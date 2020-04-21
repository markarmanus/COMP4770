import ComponentTypes from "../../ComponentTypes";
export default class AnimationS {
  constructor(entityManager) {
    this.entityManager = entityManager;
  }
  update() {
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      if (
        entity.components[ComponentTypes.RENDERABLE]?.isOnScreen &&
        entity.components[ComponentTypes.ANIMATED]
      ) {
        const renderC = entity.components[ComponentTypes.RENDERABLE];
        const animationC = entity.components[ComponentTypes.ANIMATED];
        const currentTime = new Date().getTime();
        if (animationC.restart) {
          animationC.currentFrame = -1;
          animationC.restart = false;
          animationC.isAnimating = true;
        }
        if (
          animationC.isAnimating &&
          currentTime - animationC.timer > animationC.animationSpeed
        ) {
          animationC.timer = currentTime;
          animationC.currentFrame =
            (animationC.currentFrame + 1) % animationC.spritesCount;
          renderC.imageCropX = animationC.currentFrame * renderC.width;
          if (
            !animationC.repeat &&
            animationC.currentFrame === animationC.spritesCount - 1
          )
            animationC.isAnimating = false;
        }
      }
    }
  }
}
