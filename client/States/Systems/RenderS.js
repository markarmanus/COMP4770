import ComponentTypes from "../../ComponentTypes";
import Helper from "../../Helper";
export default class RenderS {
  constructor(entityManager) {
    this.entityManager = entityManager;
    this.currentIndex;
    this.levelsArray = [];
  }
  updateCanvasOffset() {}
  async update() {
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      const renderC = entity.components[ComponentTypes.RENDERABLE];
      if (renderC && renderC.shouldRender) {
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
          if (renderC.rotation || renderC.alpha) {
            canvasContext.save();
            if (renderC.rotation) {
              canvasContext.translate(
                renderC.posX + renderC.scaledWidth / 2,
                renderC.posY + renderC.scaledHeight / 2
              );
              canvasContext.rotate(renderC.rotation * (Math.PI / 180));
              canvasContext.translate(
                -renderC.posX - renderC.scaledWidth / 2,
                -renderC.posY - renderC.scaledHeight / 2
              );
            }
            if (renderC.alpha) canvasContext.globalAlpha = renderC.alpha;
          }

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
          if (renderC.shadowEffect) {
            canvasContext.drawImage(
              renderC.image,
              renderC.imageCropX,
              renderC.imageCropY,
              renderC.width,
              renderC.height,
              renderC.lastPosX,
              renderC.lastPosY,
              renderC.scaledWidth,
              renderC.scaledHeight
            );
          }
          renderC.lastPosX = renderC.posX;
          renderC.lastPosY = renderC.posY;
        }
        if (renderC.rotation) {
          canvasContext.restore();
        }
        if (renderC.alpha) {
          canvasContext.globalAlpha = 1;
        }
        let canvasOffset = Helper.getCanvasOffset();
        // if going to add buffer to loading zone, remember Helper AI wont work.
        if (
          renderC.posX + canvasOffset.x < -64 ||
          renderC.posX + canvasOffset.x > canvas.width + 64 ||
          renderC.posY + canvasOffset.y < -64 ||
          renderC.posY + canvasOffset.y > canvas.height + 64
        ) {
          renderC.isOnScreen = false;
        } else {
          renderC.isOnScreen = true;
        }
      }
    }
  }
}
