import ComponentTypes from "./../../../ComponentTypes";
export default class MovementS {
  update(entityManager) {
    const entities = entityManager.getEntities();
    for (const entity of entities) {
      if (
        entity.components[ComponentTypes.RENDERABLE] &&
        entity.components[ComponentTypes.MOVABLE] &&
        entity.components[ComponentTypes.CONTROLABLE]
      ) {
        const renderC = entity.components[ComponentTypes.RENDERABLE];
        const movementC = entity.components[ComponentTypes.MOVABLE];
        const controllsC = entity.components[ComponentTypes.CONTROLABLE];
        const spritesC = entity.components[ComponentTypes.MULTI_SPRITES];
        if (controllsC.bttnsState[controllsC.rightBttn]) {
          movementC.currentVelocity +=
            movementC.velocity * movementC.accerlationSpeed;
        }
        if (controllsC.bttnsState[controllsC.leftBttn]) {
          movementC.currentVelocity -=
            movementC.velocity * movementC.accerlationSpeed;
        }
        if (controllsC.bttnsState[controllsC.rightBttn] === false) {
          if (movementC.currentVelocity > 0) {
            let newVelocity =
              movementC.currentVelocity -
              movementC.velocity * movementC.friction;
            movementC.currentVelocity = newVelocity < 0 ? 0 : newVelocity;
          }
        }
        if (controllsC.bttnsState[controllsC.leftBttn] === false) {
          if (movementC.currentVelocity < 0) {
            let newVelocity =
              movementC.currentVelocity +
              movementC.velocity * movementC.friction;
            movementC.currentVelocity = newVelocity > 0 ? 0 : newVelocity;
          }
        }
        movementC.currentVelocity =
          movementC.currentVelocity > movementC.maxVelocity
            ? movementC.maxVelocity
            : movementC.currentVelocity < -1 * movementC.maxVelocity
            ? movementC.maxVelocity * -1
            : movementC.currentVelocity;
        if (spritesC) {
          switch (true) {
            case movementC.currentVelocity > 2:
              renderC.imageCropY = spritesC.sprites.right;
              break;
            case movementC.currentVelocity < -2:
              renderC.imageCropY = spritesC.sprites.left;
              break;
            default:
              renderC.imageCropY = spritesC.sprites.idle;
          }
        }
        renderC.posX += movementC.currentVelocity;
      }
    }
  }
}
