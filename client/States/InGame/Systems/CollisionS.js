import ComponentTypes from "./../../../ComponentTypes";
import Sounds from "../../../Assets/SoundGenerator";
import { EffectsGenerator, Effects } from "../EffectsGenerator";
export default class CollisionS {
  constructor(entityManager) {
    this.entityManager = entityManager;

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
  canEntitiesCollide(entity1, entity2) {
    if (entity1.descriptor === entity2.descriptor) {
      return false;
    }
    const cantColide = {
      LaserBullet: ["Floor", "Currency"],
      Floor: ["Currency", "LaserBullet"],
      Player: ["StormTropper"],
      Currency: ["Floor", "LaserBullet"],
    };
    const condition1 =
      cantColide[entity1.descriptor] &&
      cantColide[entity1.descriptor].includes(entity2.descriptor);
    const condition2 =
      cantColide[entity2.descriptor] &&
      cantColide[entity2.descriptor].includes(entity1.descriptor);
    if (condition1 || condition2) {
      return false;
    }

    return true;
  }
  handleCollision(entity1, entity2, direction) {
    const type = entity1.descriptor + "To" + entity2.descriptor;
    switch (type) {
      case "PlayerToCurrency":
        this.handlePickUpCurrency(entity1, entity2);
        this.destroyWithEffect(entity2, Effects.explosion);
        break;
      case "PlayerToLaserBullet":
        this.doDamage(entity1, entity2);
        this.destroyWithEffect(entity2, Effects.explosion);
        break;
      case "PlayerToDrone":
        this.doDamage(entity1, entity2);
        this.destroyWithEffect(entity2, Effects.explosion);
        break;
      case "DroneToOrb":
      case "StormTropperToOrb":
        this.doDamage(entity1, entity2);
        break;
      case "OrbToFloor":
      case "LaserBulletToFloor":
        this.destroyWithEffect(entity1, Effects.explosion);
        break;

      //Drone To
      case "DroneToStormTropper":
      case "DroneToCurrency":
      //LaserBullet To
      case "LaserBulletToOrb":
      //Player To
      case "PlayerToOrb":
      //Orb To
      case "OrbToLaserBullet":
      case "OrbToCurrency":
      case "OrbToStormTropper":
      case "OrbToDrone":
      case "OrbToPlayer":
      //StromTropper To
      case "StormTropperToDrone":
      case "StormTropperToCurrency":
      //Currency To
      case "CurrencyToStormTropper":
      case "CurrencyToDrone":
      case "CurrencyToOrb":
      //Floor To
      case "FloorToDrone":
      case "FloorToOrb":
      case "FloorToLaserBullet":
        break;

      default:
        this.handleDefaultCollision(entity1, entity2, direction);
    }
  }
  doDamage(toDamage, causesDamage) {
    const damageC = causesDamage.components[ComponentTypes.DAMAGE];
    const healthC = toDamage.components[ComponentTypes.HEALTH];
    if (damageC && healthC) {
      healthC.currentHealth -= damageC.damage;
    }
  }
  destroyWithEffect(toDestroy, effecType, offset = { x: 0, y: 0 }) {
    toDestroy.remove();
    EffectsGenerator.createEffect(
      effecType,
      this.entityManager,
      offset,
      toDestroy,
      false
    );
  }
  handlePickUpCurrency(player, currency) {
    const currencyC = player.components[ComponentTypes.CURRENCY];
    if (currencyC) currencyC.currentCurrency++;
  }
  handleDefaultCollision(entity1, entity2, direction) {
    const e1RenderC = entity1.components[ComponentTypes.RENDERABLE];
    const e1CollisionC = entity1.components[ComponentTypes.COLLIDABLE];
    const e1CBox = this.getCollisionBox(entity1);
    const e2CBox = this.getCollisionBox(entity2);
    const e1MovementC = entity1.components[ComponentTypes.MOVABLE];
    const e2MovementC = entity2.components[ComponentTypes.MOVABLE];
    const offSet = this.getRenderCollisionBoxDiff(e1RenderC, e1CollisionC);
    if (direction === "above") {
      e1RenderC.posY = e2CBox.top - e1CBox.height - offSet.height;
      e1CollisionC.isGrounded = true;
    } else if (direction === "below") {
      e1RenderC.posY = e2CBox.bottom + offSet.height;
      const movementC = entity1.components[ComponentTypes.MOVABLE];
      if (movementC?.currentjumpForce) movementC.currentjumpForce = 0;
    } else if (direction === "right") {
      e1RenderC.posX = e2CBox.left - e1CBox.width - offSet.width;
    } else if (direction === "left") {
      e1RenderC.posX = e2CBox.right - offSet.width;
    }
    if (direction === "right" || direction === "left") {
      if (e1MovementC) e1MovementC.currentValocity = 0;
      if (e2MovementC) e2MovementC.currentValocity = 0;
    }
  }

  update() {
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      const entityRenderC = entity.components[ComponentTypes.RENDERABLE];
      const entityCollisionC = entity.components[ComponentTypes.COLLIDABLE];
      if (entityRenderC && entityRenderC.isOnScreen && entityCollisionC) {
        entityCollisionC.isGrounded = false;
        const entityCBox = this.getCollisionBox(entity);
        if (this.debug) this.createBorderForCBox(entityCBox);
        for (const innerEntity of entities) {
          if (
            innerEntity.descriptor !== "Player" &&
            this.canEntitiesCollide(entity, innerEntity) &&
            innerEntity.components[ComponentTypes.RENDERABLE]?.isOnScreen &&
            innerEntity.components[ComponentTypes.COLLIDABLE]
          ) {
            const innerCBox = this.getCollisionBox(innerEntity);
            if (this.isColiding(entityCBox, innerCBox)) {
              const lastEntityCBox = this.getCollisionBox(entity, true);
              const lastInnerCBox = this.getCollisionBox(innerEntity, true);
              const direction = this.getCollisionDirection(
                entityCBox,
                innerCBox,
                lastEntityCBox,
                lastInnerCBox
              );
              this.handleCollision(entity, innerEntity, direction);
            }
          }
        }
      }
    }
  }
}
