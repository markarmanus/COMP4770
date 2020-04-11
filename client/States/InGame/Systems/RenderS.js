import ComponentTypes from "./../../../ComponentTypes";
export default class RenderS {
  update(entityManager) {
    const entities = entityManager.getEntities();
    for (const entity of entities) {
      if (entity.components[ComponentTypes.RENDERABLE]) {
        const renderC = entity.components[ComponentTypes.RENDERABLE];
        if (renderC.image) {
          renderC.lastPosX = renderC.posX;
          renderC.lastPosY = renderC.posY;
          canvasContext.drawImage(
            renderC.image,
            renderC.imageCropX,
            renderC.imageCropY,
            renderC.width,
            renderC.height,
            renderC.posX,
            renderC.posY,
            renderC.scaledWidth,
            renderC.scaledHeight
          );
        }
        if (
          renderC.posX < -300 ||
          renderC.posX > canvas.width + 300 ||
          renderC.posY < -300 ||
          renderC.posY > canvas.height + 300
        ) {
          renderC.isOnScreen = false;
        } else {
          renderC.isOnScreen = true;
        }
      }
    }
  }
}
