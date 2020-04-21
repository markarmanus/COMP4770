import ComponentTypes from "./../../../ComponentTypes";
import Sounds from "../../../Assets/SoundGenerator";
import Images from "../../../Assets/ImageGenerator";
export default class MovementS {
  constructor(entityManager) {
    this.entityManager = entityManager;
  }
  setVelocityWithinBounds(velocity, maxVelocity) {
    const negativeMax = -1 * maxVelocity;
    velocity =
      velocity > maxVelocity
        ? maxVelocity
        : velocity < negativeMax
        ? negativeMax
        : velocity;
    return velocity;
  }

  addFriction(direction, currentVelocity, friction, velocity) {
    let frictionForce = velocity * friction;
    frictionForce = direction === "left" ? -1 * frictionForce : frictionForce;
    let newVelocity = currentVelocity + frictionForce;
    if (direction === "left" && newVelocity < 0) newVelocity = 0;
    if (direction === "right" && newVelocity > 0) newVelocity = 0;
    return newVelocity;
  }
  update() {
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      const renderC = entity.components[ComponentTypes.RENDERABLE];
      const movementC = entity.components[ComponentTypes.MOVABLE];
      const controllsC = entity.components[ComponentTypes.CONTROLABLE];
      const focusC = entity.components[ComponentTypes.FOCUS];
      if (renderC && movementC && controllsC) {
        const spritesC = entity.components[ComponentTypes.MULTI_SPRITES];
        const collisionC = entity.components[ComponentTypes.COLLIDABLE];
        const physicsC = entity.components[ComponentTypes.PHYSICAL];

        const rightBttn = controllsC.bttnsState[controllsC.rightBttn];
        const upBttn = controllsC.bttnsState[controllsC.upBttn];
        const downBttn = controllsC.bttnsState[controllsC.downBttn];

        const rightDbl = controllsC.bttnsDblClickState[controllsC.rightBttn];
        const leftDbl = controllsC.bttnsDblClickState[controllsC.leftBttn];
        const upDbl = controllsC.bttnsDblClickState[controllsC.upBttn];
        const downDbl = controllsC.bttnsDblClickState[controllsC.downBttn];
        const leftBttn = controllsC.bttnsState[controllsC.leftBttn];
        const jumpBttn = controllsC.bttnsState[controllsC.jumpBttn];
        const isHoldingJump = controllsC.bttnsHoldState[controllsC.jumpBttn];
        const isGrounded = collisionC && collisionC.isGrounded;
        const currentTime = new Date().getTime();
        const canJump =
          (currentTime - movementC.timeSinceJump > movementC.jumpCooldown &&
            movementC.jumpsCounter < movementC.maxJumps) ||
          isGrounded;
        const canDash =
          currentTime - movementC.timeSinceDash > movementC.dashCooldown &&
          focusC.currentFocus > movementC.dashCost;
        const slidingRight =
          controllsC.bttnsState[controllsC.rightBttn] === false &&
          movementC.currentVelocity > 0;
        const slidingLeft =
          controllsC.bttnsState[controllsC.leftBttn] === false &&
          movementC.currentVelocity < 0;

        if (movementC.isJumping && isGrounded) {
          movementC.isJumping = false;
          movementC.currentjumpForce = 0;
          movementC.jumpsCounter = 0;
        }
        if (jumpBttn && canJump && !isHoldingJump) {
          if (renderC.image === Images.Yoda) Sounds.Jump().play();
          if (movementC.isJumping) {
            if (physicsC)
              physicsC.currentGravityForce *= movementC.doubleJumpForceScale;
          }
          movementC.isJumping = true;
          movementC.jumpsCounter++;
          movementC.timeSinceJump = new Date().getTime();
          movementC.currentjumpForce = movementC.jumpForce;
        }
        if (movementC.isJumping) {
          movementC.currentjumpForce -= movementC.gravityForceScaler;
        }

        if (rightBttn) {
          movementC.currentVelocity +=
            movementC.velocity * movementC.accerlationSpeed;
        }
        if (renderC.image === Images.YodaCrib) {
          if (upBttn) {
            movementC.verticalVelocity +=
              movementC.velocity * movementC.accerlationSpeed;
          } else {
            movementC.verticalVelocity -=
              movementC.velocity * movementC.accerlationSpeed;
          }
          if (downBttn) {
            movementC.verticalVelocity -=
              movementC.velocity * movementC.accerlationSpeed;
          } else {
            movementC.verticalVelocity +=
              movementC.velocity * movementC.accerlationSpeed;
          }
        }

        if (leftBttn) {
          movementC.currentVelocity -=
            movementC.velocity * movementC.accerlationSpeed;
        }
        if (slidingRight) {
          movementC.currentVelocity = movementC.currentVelocity = this.addFriction(
            "left",
            movementC.currentVelocity,
            movementC.friction,
            movementC.velocity
          );
        }
        if (slidingLeft) {
          movementC.currentVelocity = this.addFriction(
            "right",
            movementC.currentVelocity,
            movementC.friction,
            movementC.velocity
          );
        }
        if (canDash) {
          movementC.isDashingTo = rightDbl ? "right" : leftDbl ? "left" : null;
          if (movementC.isDashingTo) {
            focusC.currentFocus -= movementC.dashCost;
            Sounds.Dash().play();
            movementC.timeSinceDash = new Date().getTime();
          }
        }
        if (movementC.isDashingTo) {
          renderC.alpha = 0.6;
          renderC.shadowEffect = true;
          collisionC.isInvincible = true;
          movementC.currentDashFrame++;
          switch (movementC.isDashingTo) {
            case "right":
              renderC.posX += 10;
              break;
            case "left":
              renderC.posX -= 10;
              break;
          }
          if (movementC.currentDashFrame >= movementC.totalDashFrames) {
            movementC.isDashingTo = null;
            movementC.currentDashFrame = 0;
          }
        } else {
          renderC.shadowEffect = false;
          renderC.alpha = 1;
        }

        movementC.currentVelocity = this.setVelocityWithinBounds(
          movementC.currentVelocity,
          movementC.maxVelocity
        );
        if (movementC.verticalVelocity !== 0) {
          movementC.verticalVelocity = this.setVelocityWithinBounds(
            movementC.verticalVelocity,
            movementC.maxVelocity
          );
          renderC.posY -= movementC.verticalVelocity;
        }

        renderC.posX += movementC.currentVelocity;
        renderC.posY -= movementC.currentjumpForce;
      }
    }
  }
}
