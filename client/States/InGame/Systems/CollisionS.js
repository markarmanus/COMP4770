import ComponentTypes from "./../../../ComponentTypes";
import Sounds from "../../../Assets/SoundGenerator";
import { EffectsGenerator, Effects } from "../EffectsGenerator";
import Images from "../../../Assets/ImageGenerator";
import EntityData from "../../../Configuration/EntityData";
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
      x: posX + renderC.scaledWidth * 0.5 * (1 - collisionC.subSquareRatio.x),

      y: posY + renderC.scaledHeight * 0.5 * (1 - collisionC.subSquareRatio.y),
      width: renderC.scaledWidth * collisionC.subSquareRatio.x,
      height: renderC.scaledHeight * collisionC.subSquareRatio.y,
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
    const remainingRatio = {
      x: 1 - collisionC.subSquareRatio.x,
      y: 1 - collisionC.subSquareRatio.y,
    };

    return {
      width: (renderC.scaledWidth * remainingRatio.x) / 2,
      height: (renderC.scaledHeight * remainingRatio.y) / 2,
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

  handleCollision(entity1, entity2, type, direction) {
    switch (type) {
      case "PlayerToCurrency":
        Sounds.CoinPickUp().play();
        this.handlePickUpCurrency(entity1, entity2);
        entity2.remove();
        break;
      case "PlayerToLaserBullet":
        this.doDamage(entity1, entity2);
        this.destroyWithEffect(entity2, Effects.SmallSmoke);
        break;
      case "PlayerToDrone":
        this.doDamage(entity1, entity2);
        Sounds.Explosion().play();
        this.destroyWithEffect(entity2, Effects.Explosion, { x: 0.6, y: 0.6 });
        break;
      case "DroneToOrb":
      case "StormTrooperToOrb":
        this.doDamage(entity1, entity2);
        this.destroyWithEffect(entity2, Effects.Explosion, { x: 0.5, y: 0.5 });
        break;
      case "PlayerToCheckPoint":
        Sounds.CoinPickUp().play();
        this.handlePlayerHitsCheckPoint(entity1, entity2);
        break;
      case "FireBallToDrone":
      case "FireBallToStormTrooper":
        this.doDamage(entity2, entity1);
        break;
      case "PlayerToEmptyCrib":
      case "PlayerToMushroom":
      case "PlayerToScroll":
        this.handlePlayerCollidePickUp(entity1, entity2);
        break;
      case "FireBallToFloor":
        this.handleFireBallHitsFloor(entity1);
        this.destroyWithEffect(entity1, Effects.Explosion, { x: 0.5, y: 0.5 });
        break;
      case "OrbToFloor":
      case "LaserBulletToFloor":
        this.destroyWithEffect(
          entity1,
          Effects.Explosion,
          { x: 0.5, y: 0.5 },
          1
        );
        break;
      case "PlayerToLavalFloor":
        this.doDamage(entity1, entity2);
        this.handleDefaultCollision(entity1, entity2, direction);
        break;
      case "PlayerToIceFloor":
        this.handlePlayerWalkOnIce(entity1, entity2);
        this.handleDefaultCollision(entity1, entity2, direction);
        break;
      case "PlayerToMudFloor":
        this.handlePlayerWalkOnMud(entity1);
        this.handleDefaultCollision(entity1, entity2, direction);
        break;
      case "PlayerToSpike":
        this.instantKillPlayer(entity1);
        break;
      case "PlayerToFloor":
        this.resetPlayerProperties(entity1);
        this.handleDefaultCollision(entity1, entity2, direction);
        break;
      default:
        this.handleDefaultCollision(entity1, entity2, direction);
    }
  }
  instantKillPlayer(player) {
    const healthC = player.components[ComponentTypes.HEALTH];
    healthC.currentHealth = -1;
  }
  resetPlayerProperties(player) {
    const movementC = player.components[ComponentTypes.MOVABLE];
    if (movementC.hasEffect) {
      const defaultMovement = EntityData.Player[ComponentTypes.MOVABLE];
      movementC.friction = defaultMovement.friction;
      movementC.velocity = defaultMovement.velocity;
      movementC.jumpForce = defaultMovement.jumpForce;
      movementC.maxVelocity = defaultMovement.maxVelocity;
    }
  }
  handlePlayerWalkOnIce(player) {
    const movementC = player.components[ComponentTypes.MOVABLE];
    movementC.hasEffect = true;
    movementC.friction = 0.08;
  }
  handlePlayerWalkOnMud(player) {
    const movementC = player.components[ComponentTypes.MOVABLE];
    movementC.hasEffect = true;
    movementC.friction = 1;
    movementC.velocity = 0.5;
    movementC.maxVelocity = 1;
    movementC.jumpForce = 7.5;
  }
  canCollision(type) {
    switch (type) {
      case "OrbToFloor":
      case "LaserBulletToFloor":
      case "DroneToOrb":
      case "StormTrooperToOrb":
      case "PlayerToMushroom":
      case "StormTrooperToFloor":
      case "FireBallToDrone":
      case "FireBallToStormTrooper":
      case "FireBallToFloor":
      case "PlayerToIceFloor":
      case "PlayerToLavalFloor":
      case "PlayerToScroll":
      case "PlayerToMudFloor":
      case "PlayerToSpike":
      case "PlayerToGlass":
      case "PlayerToEmptyCrib":
      case "PlayerToDrone":
      case "PlayerToCheckPoint":
      case "PlayerToLaserBullet":
      case "CheckPointToFloor":
      case "PlayerToCurrency":
      case "PlayerToFloor":
        return true;
      default:
        return false;
    }
  }

  handleFireBallHitsFloor() {
    const player = this.entityManager.getEntitiesOfType("Player")[0];
    const controllC = player.components[ComponentTypes.CONTROLABLE];
    controllC.mouseState.rightClick = false;
  }
  handlePlayerCollidePickUp(player, pickUp) {
    const pickUpC = pickUp.components[ComponentTypes.PICK_UP];
    if (pickUpC) {
      pickUpC.wasPickedUp = true;
      pickUpC.pickedUpBy = player;
    }
  }
  handlePlayerHitsCheckPoint(player, checkPoint) {
    const checkPointC = player.components[ComponentTypes.CHECKPOINT];
    const playerRenderC = player.components[ComponentTypes.RENDERABLE];
    const checkPointRenderC = checkPoint.components[ComponentTypes.RENDERABLE];
    const currencyC = player.components[ComponentTypes.CURRENCY];
    if (checkPointC && checkPointRenderC.image !== Images.CampFireOn) {
      checkPointC.lastCheckPoint = {
        x: playerRenderC.posX,
        y: playerRenderC.posY,
        currency: currencyC.currentCurrency,
      };
      checkPointRenderC.image = Images.CampFireOn;
      checkPointRenderC.height = Images.CampFireOn.naturalHeight;
    }
  }
  doDamage(toDamage, causesDamage) {
    const damageC = causesDamage.components[ComponentTypes.DAMAGE];
    const healthC = toDamage.components[ComponentTypes.HEALTH];
    const collisionC = toDamage.components[ComponentTypes.COLLIDABLE];
    if (damageC && healthC && !collisionC.isInvincible) {
      healthC.currentHealth -= damageC.damage;
    }
  }
  destroyWithEffect(toDestroy, effecType, offset = { x: 0, y: 0 }, scale) {
    EffectsGenerator.createEffect(
      effecType,
      this.entityManager,
      offset,
      toDestroy,
      scale
    );
    toDestroy.remove();
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
      if (
        entityRenderC &&
        entityRenderC.isOnScreen &&
        entityRenderC.shouldRender &&
        entityCollisionC
      ) {
        entityCollisionC.isGrounded = false;
        const entityCBox = this.getCollisionBox(entity);
        if (this.debug) this.createBorderForCBox(entityCBox);
        for (const innerEntity of entities) {
          const type = entity.descriptor + "To" + innerEntity.descriptor;
          const innerRenderC =
            innerEntity.components[ComponentTypes.RENDERABLE];
          if (
            this.canCollision(type) &&
            innerRenderC &&
            innerRenderC.isOnScreen &&
            innerRenderC.shouldRender &&
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
              this.handleCollision(entity, innerEntity, type, direction);
            }
          }
        }
      }
    }
  }
}
