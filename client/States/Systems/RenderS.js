import ComponentTypes from "../../ComponentTypes";
import Helper from "../../Helper";
export default class RenderS {
  constructor(entityManager) {
    this.entityManager = entityManager;
  }
  updateCanvasOffset() {}
  async update() {
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      const renderC = entity.components[ComponentTypes.RENDERABLE];
      if (renderC) {
        const spriteC = entity.components[ComponentTypes.MULTI_SPRITES];
        const movementC = entity.components[ComponentTypes.MOVABLE];
        if (spriteC) {
          let movingRight = movementC && movementC.currentVelocity > 2;
          let movingLeft = movementC && movementC.currentVelocity < -2;
          switch (true) {
            case renderC.lastPosX < renderC.posX || movingRight:
              renderC.imageCropY = spriteC.sprites.right;
              break;
            case renderC.lastPosX > renderC.posX || movingLeft:
              renderC.imageCropY = spriteC.sprites.left;
              break;
            default:
              renderC.imageCropY = spriteC.sprites.idle;
          }
        }
        if (renderC.image && renderC.isOnScreen) {
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
        let canvasOffset = Helper.getCanvasOffset();
        // if going to add buffer to loading zone, remember Helper AI wont work.
        if (
          renderC.posX + canvasOffset.x < -32 ||
          renderC.posX + canvasOffset.x > canvas.width + 32 ||
          renderC.posY + canvasOffset.y < -32 ||
          renderC.posY + canvasOffset.y > canvas.height + 32
        ) {
          renderC.isOnScreen = false;
        } else {
          renderC.isOnScreen = true;
        }
      }
    }
  }
}
