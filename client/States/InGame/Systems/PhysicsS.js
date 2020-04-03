import ComponentTypes from "./../../../ComponentTypes";
export default class CollisionS {
  constructor(gravity) {
    this.gravity = gravity;
  }
  setGravityWithtinBounds(gravity, maxGravity) {
    return gravity > maxGravity ? maxGravity : gravity;
  }
  update(entityManager) {
    const entities = entityManager.getEntities();
    for (const entity of entities) {
      if (
        entity.components[ComponentTypes.RENDERABLE] &&
        entity.components[ComponentTypes.PHYSICAL]
      ) {
        const physicsC = entity.components[ComponentTypes.PHYSICAL];
        const renderC = entity.components[ComponentTypes.RENDERABLE];
        const collisionC = entity.components[ComponentTypes.COLLIDABLE];
        if (collisionC && collisionC.isGrounded) {
          physicsC.currentGravityForce = 0;
          continue;
        }
        let newGrvityF =
          physicsC.currentGravityForce + this.gravity * physicsC.airFriction;
        newGrvityF = this.setGravityWithtinBounds(
          newGrvityF,
          physicsC.maxGravity
        );
        renderC.posY += newGrvityF;
        physicsC.currentGravityForce = newGrvityF;
      }
    }
  }
}
