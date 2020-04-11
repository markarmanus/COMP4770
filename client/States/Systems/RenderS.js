import ComponentTypes from "../../ComponentTypes";
export default class RenderS {

  updateCanvasOffset() {
    const canvasTransform = canvasContext.getTransform();
    this.canvasOffset = {
      x: canvasTransform.e,
      y: canvasTransform.f,
    };
  }
  update(entityManager) {
    this.updateCanvasOffset();

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
          renderC.posX + this.canvasOffset.x < -300 ||
          renderC.posX + this.canvasOffset.x > canvas.width + 300 ||
          renderC.posY + this.canvasOffset.y < -300 ||
          renderC.posY + this.canvasOffset.y > canvas.height + 300
        ) {
          renderC.isOnScreen = false;
        } else {
          renderC.isOnScreen = true;
        }
      }
    }

  }

}
