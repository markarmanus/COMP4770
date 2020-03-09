import ComponentTypes from "./../../../ComponentTypes";
export default class RenderS {
  update(entityManager) {
    const entities = entityManager.getEntities();
    for (const entity of entities) {
      if (entity.components[ComponentTypes.RENDERABLE]) {
        const renderComponent = entity.components[ComponentTypes.RENDERABLE];
        canvasContext.fillStyle = "#FF0000";
        renderComponent.posX += renderComponent.speedX;
        renderComponent.posY += renderComponent.speedY;
        canvasContext.fillRect(
          renderComponent.posX,
          renderComponent.posY,
          renderComponent.width,
          renderComponent.height
        );
      }
    }
  }
}
