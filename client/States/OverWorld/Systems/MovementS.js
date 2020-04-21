import ComponentTypes from "./../../../ComponentTypes";
export default class MoementS {
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
  update(planets) {
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      const renderC = entity.components[ComponentTypes.RENDERABLE];
      const movementC = entity.components[ComponentTypes.MOVABLE];
      const controllsC = entity.components[ComponentTypes.CONTROLABLE];
      if (renderC && movementC && controllsC) {
        //Moving yoda, remove for now
        const rightBttn = controllsC.bttnsState[controllsC.rightBttn];
        const leftBttn = controllsC.bttnsState[controllsC.leftBttn];
        const upBttn = controllsC.bttnsState[controllsC.upBttn];
        const downBttn = controllsC.bttnsState[controllsC.downBttn];
        if (!rightBttn && !leftBttn) {
          movementC.currentVelocity = 0;
        }
        if (!upBttn && !downBttn) {
          movementC.currentVerticalVelocity = 0;
        }
        if (rightBttn) {
          movementC.currentVelocity +=
            movementC.velocity * movementC.accerlationSpeed;
        }
        if (leftBttn) {
          movementC.currentVelocity -=
            movementC.velocity * movementC.accerlationSpeed;
        }
        if (upBttn) {
          movementC.currentVerticalVelocity -=
            movementC.velocity * movementC.accerlationSpeed;
        }
        if (downBttn) {
          movementC.currentVerticalVelocity +=
            movementC.velocity * movementC.accerlationSpeed;
        }
        movementC.currentVelocity = this.setVelocityWithinBounds(
          movementC.currentVelocity,
          movementC.maxVelocity
        );
        movementC.currentVerticalVelocity = this.setVelocityWithinBounds(
          movementC.currentVerticalVelocity,
          movementC.maxVelocity
        );
        renderC.posX += movementC.currentVelocity;
        renderC.posY += movementC.currentVerticalVelocity;
      }
    }
  }
}
