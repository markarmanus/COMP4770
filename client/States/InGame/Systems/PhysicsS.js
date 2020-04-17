import ComponentTypes from "./../../../ComponentTypes";
export default class CollisionS {
  constructor(gravity, entityManager) {
    this.gravity = gravity;
    this.entityManager = entityManager;
  }
  setGravityWithtinBounds(gravity, maxGravity) {
    return gravity > maxGravity ? maxGravity : gravity;
  }
  update() {
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      const physicsC = entity.components[ComponentTypes.PHYSICAL];
      const renderC = entity.components[ComponentTypes.RENDERABLE];
      if (renderC && renderC.isOnScreen && physicsC) {
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
