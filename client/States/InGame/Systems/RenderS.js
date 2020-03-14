import ComponentTypes from "./../../../ComponentTypes";
export default class RenderS {
  update(entityManager) {
    const entities = entityManager.getEntities();
    for (const entity of entities) {
      if (entity.components[ComponentTypes.RENDERABLE]) {
        const renderC = entity.components[ComponentTypes.RENDERABLE];
        if (renderC.image) {
          canvasContext.drawImage(
            renderC.image,
            renderC.imageCropX,
            renderC.imageCropY,
            renderC.imageWidth,
            renderC.imageHeight,
            renderC.posX,
            renderC.posY,
            renderC.width,
            renderC.height
          );
        } else {
          canvasContext.fillStyle = "#FF0000";
          canvasContext.fillRect(
            renderC.posX,
            renderC.posY,
            renderC.width,
            renderC.height
          );
        }
      }
    }
  }
}
