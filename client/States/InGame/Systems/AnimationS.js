import ComponentTypes from "./../../../ComponentTypes";
export default class AnimationS {
  update(entityManager) {
    const entities = entityManager.getEntities();
    for (const entity of entities) {
      if (
        entity.components[ComponentTypes.RENDERABLE] &&
        entity.components[ComponentTypes.ANIMATED]
      ) {
        const renderC = entity.components[ComponentTypes.RENDERABLE];
        const animationC = entity.components[ComponentTypes.ANIMATED];
        const currentTime = new Date().getTime();
        if (currentTime - animationC.timer > animationC.animationSpeed) {
          animationC.timer = currentTime;
          animationC.currentFrame =
            (animationC.currentFrame + 1) % animationC.spritesCount;
          renderC.imageCropX = animationC.currentFrame * renderC.imageWidth;
        }
      }
    }
  }
}
