import ComponentTypes from "./../../../ComponentTypes";
import Sounds from "../../../Assets/SoundGenerator";
import { EffectsGenerator, Effects } from "../EffectsGenerator";
export default class CollisionS {
  constructor() {
    this.debug = false;
    window.addEventListener("keydown", (e) => {
      if (e.key === "C") {
        this.debug = !this.debug;
      }
    });
  }
  getCollisionBox(entity, old = false) {
    const renderC = entity.components[ComponentTypes.RENDERABLE];
    const collisionC = entity.components[ComponentTypes.COLLIDABLE];
    const posX = old ? renderC.lastPosX : renderC.posX;
    const posY = old ? renderC.lastPosY : renderC.posY;
    const entityCBox = {
      x: posX + renderC.scaledWidth * 0.5 * (1 - collisionC.subSquareRatio),

      y: posY + renderC.scaledHeight * 0.5 * (1 - collisionC.subSquareRatio),
      width: renderC.scaledWidth * collisionC.subSquareRatio,
      height: renderC.scaledHeight * collisionC.subSquareRatio,
    };
    entityCBox.top = entityCBox.y;
    entityCBox.bottom = entityCBox.y + entityCBox.height;
    entityCBox.right = entityCBox.x + entityCBox.width;
    entityCBox.left = entityCBox.x;
    return entityCBox;
  }
  createBorderForCBox(coliisionBox) {
    canvasContext.strokeStyle = "#FF0000";
    canvasContext.strokeRect(
      coliisionBox.x,
      coliisionBox.y,
      coliisionBox.width,
      coliisionBox.height
    );
  }
  isColiding(cBox1, cBox2) {
    return (
      cBox1.x < cBox2.x + cBox2.width &&
      cBox1.x + cBox1.width > cBox2.x &&
      cBox1.y < cBox2.y + cBox2.height &&
      cBox1.y + cBox1.height > cBox2.y
    );
  }
  getRenderCollisionBoxDiff(renderC, collisionC) {
    const remainingRatio = 1 - collisionC.subSquareRatio;
    return {
      width: (renderC.scaledWidth * remainingRatio) / 2,
      height: (renderC.scaledHeight * remainingRatio) / 2,
    };
  }
  getCollisionDirection(cBox1, cBox2, lastCBox1, lastCBox2) {
    if (cBox1.bottom >= lastCBox1.top && lastCBox1.bottom <= lastCBox2.top)
      return "above";
    if (cBox1.top <= cBox2.bottom && lastCBox1.top >= lastCBox2.bottom)
      return "below";
    if (cBox1.right >= cBox2.left && lastCBox1.right <= lastCBox2.left)
      return "right";
    if (cBox1.left <= cBox2.right && lastCBox1.left >= lastCBox2.right)
      return "left";
  }
  canEntitiesCollid(entity1, entity2) {
    // if same describtor but not floor cause floor can colid with it self.
    if (entity1.descriptor === entity2.descriptor) {
      return false;
    }
    if (entity1.id === entity2.id) {
      return false;
    }
    if (
      entity1.descriptor === "Currency" ||
      entity2.descriptor === "Currency"
    ) {
      if (entity1.descriptor === "Floor" || entity2.descriptor === "Floor") {
        return false;
      }
    }
    return true;
  }
  update(entityManager) {
    const entities = entityManager.getEntities();
    for (const entity of entities) {
      if (
        entity.components[ComponentTypes.RENDERABLE]?.isOnScreen &&
        entity.components[ComponentTypes.COLLIDABLE]
      ) {
        const entityRenderC = entity.components[ComponentTypes.RENDERABLE];
        const entityCollisionC = entity.components[ComponentTypes.COLLIDABLE];
        const entityMovementC = entity.components[ComponentTypes.MOVABLE];
        entityCollisionC.isGrounded = false;
        const entityCBox = this.getCollisionBox(entity);
        if (this.debug) this.createBorderForCBox(entityCBox);
        for (const innerEntity of entities) {
          if (
            innerEntity.descriptor !== "Player" &&
            this.canEntitiesCollid(entity, innerEntity) &&
            innerEntity.components[ComponentTypes.RENDERABLE]?.isOnScreen &&
            innerEntity.components[ComponentTypes.COLLIDABLE]
          ) {
            const innerCBox = this.getCollisionBox(innerEntity);
            const innerMovementC =
              innerEntity.components[ComponentTypes.MOVABLE];
            if (this.isColiding(entityCBox, innerCBox)) {
              const lastEntityCBox = this.getCollisionBox(entity, true);
              const lastInnerCBox = this.getCollisionBox(innerEntity, true);
              const offSet = this.getRenderCollisionBoxDiff(
                entityRenderC,
                entityCollisionC
              );
              const direction = this.getCollisionDirection(
                entityCBox,
                innerCBox,
                lastEntityCBox,
                lastInnerCBox
              );
              if (
                innerEntity.descriptor === "Currency" &&
                entity.descriptor === "Player"
              ) {
                const currencyC = entity.components[ComponentTypes.CURRENCY];
                if (currencyC) currencyC.currentCurrency++;
                innerEntity.remove();
                Sounds.explosion().play();
                EffectsGenerator.createEffect(
                  Effects.explosion,
                  entityManager,
                  { x: 0, y: 0 },
                  innerEntity,
                  false
                );
              } else {
                if (direction === "above") {
                  entityRenderC.posY =
                    innerCBox.top - entityCBox.height - offSet.height;
                  entityCollisionC.isGrounded = true;
                } else if (direction === "below") {
                  entityRenderC.posY = innerCBox.bottom + offSet.height;
                  const movementC = entity.components[ComponentTypes.MOVABLE];
                  if (movementC?.currentjumpForce)
                    movementC.currentjumpForce = 0;
                } else if (direction === "right") {
                  entityRenderC.posX =
                    innerCBox.left - entityCBox.width - offSet.width;
                } else if (direction === "left") {
                  entityRenderC.posX = innerCBox.right - offSet.width;
                }
                if (direction === "right" || direction === "left") {
                  if (entityMovementC) entityMovementC.currentValocity = 0;
                  if (innerMovementC) innerMovementC.currentValocity = 0;
                }
              }
            }
          }
        }
      }
    }
  }
}
