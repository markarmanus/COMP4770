import ComponentTypes from "../../../ComponentTypes";
import Vec2 from "../Vec2";
export default class BehaviourS {
  constructor() {}
  handleFollow(entity) {
    const renderC = entity.components[ComponentTypes.RENDERABLE];
    const followC = entity.components[ComponentTypes.FOLLOW];
    if (followC.isActive) {
      let locationTofollow = null;
      if (followC.entityToFollow === "mouse") {
        locationTofollow = window.mouseTracker.getLocation(0);
      }
      followC.locationStack.push(locationTofollow);
      if (followC.locationStack.length > followC.delay) {
        let newLocation = followC.locationStack.shift();
        renderC.posX = newLocation.x + followC.offset.x;
        renderC.posY = newLocation.y + followC.offset.y;
      }
    }
  }
  handleCharge(entity) {
    const renderC = entity.components[ComponentTypes.RENDERABLE];
    const chargeC = entity.components[ComponentTypes.CHARGE];
    if (!chargeC.speedVector)
      chargeC.speedVector = new Vec2(
        chargeC.location.x - renderC.posX,
        chargeC.location.y - renderC.posY
      );
    renderC.posY += chargeC.speedVector.normalY * chargeC.speed;
    renderC.posX += chargeC.speedVector.normalX * chargeC.speed;
  }
  handleSeek(entity) {
    const renderC = entity.components[ComponentTypes.RENDERABLE];
    const seekC = entity.components[ComponentTypes.SEEK];
    const entityToSeekRenderC =
      seekC.entityToSeek.components[ComponentTypes.RENDERABLE];
    let directVector = new Vec2(
      entityToSeekRenderC.posX + seekC.offset.x - renderC.posX,
      entityToSeekRenderC.posY + seekC.offset.y - renderC.posY
    );
    seekC.currentSpeed += seekC.speed * seekC.accerlation;
    seekC.currentSpeed =
      seekC.currentSpeed > seekC.maxSpeed ? seekC.maxSpeed : seekC.currentSpeed;
    if (Math.abs(directVector.x) < 10 && Math.abs(directVector.y) < 10) {
      seekC.currentSpeed = 0;
    }
    renderC.posY += directVector.normalY * seekC.currentSpeed;
    renderC.posX += directVector.normalX * seekC.currentSpeed;
  }
  update(entityManager) {
    const entities = entityManager.getEntities();
    for (const entity of entities) {
      if (entity.components[ComponentTypes.RENDERABLE]) {
        if (entity.components[ComponentTypes.SEEK]) {
          this.handleSeek(entity);
        }
        if (entity.components[ComponentTypes.CHARGE]) {
          this.handleCharge(entity);
        }
        if (entity.components[ComponentTypes.FOLLOW]) {
          this.handleFollow(entity);
        }
      }
    }
  }
}
