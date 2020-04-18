import ComponentTypes from "./../../../ComponentTypes";
import ShooterC from "../Components/ShooterC";
import DroneC from "../Components/DroneC";
import PatrolC from "../Components/PatrolC";
import Vec2 from "../../../Vec2";
export default class AiS {
  constructor(entityManager) {
    this.entityManager = entityManager;
    this.debug = false;
    window.addEventListener("keydown", (e) => {
      if (e.key === "C") {
        this.debug = !this.debug;
      }
    });
  }
  canSeeEachOther(player, entity, entities) {
    const playerRenderC = player.components[ComponentTypes.RENDERABLE];
    const entityRenderC = entity.components[ComponentTypes.RENDERABLE];
    const playerVisionOffset = playerRenderC.visionOffset
      ? playerRenderC.visionOffset
      : { x: 0, y: 0 };
    const entityVisionOffset = entityRenderC.visionOffset
      ? entityRenderC.visionOffset
      : { x: 0, y: 0 };
    const tropperVec = new Vec2(
      entityRenderC.posX + entityVisionOffset.x * entityRenderC.scaledWidth,
      entityRenderC.posY + entityVisionOffset.y * entityRenderC.scaledHeight
    );
    const playerVec = new Vec2(
      playerRenderC.posX + playerVisionOffset.x * playerRenderC.scaledWidth,
      playerRenderC.posY + playerVisionOffset.y * playerRenderC.scaledHeight
    );
    if (this.debug) this.drawDebugger(tropperVec, playerVec, false);

    for (const blockerEntity of entities) {
      if (
        blockerEntity.components[ComponentTypes.RENDERABLE]?.isOnScreen &&
        blockerEntity.components[ComponentTypes.RENDERABLE].blocksView
      ) {
        const blockerRenderC =
          blockerEntity.components[ComponentTypes.RENDERABLE];

        const leftTop = new Vec2(blockerRenderC.posX, blockerRenderC.posY);
        const leftBottom = new Vec2(
          blockerRenderC.posX,
          blockerRenderC.posY + blockerRenderC.scaledHeight
        );
        const rightTop = new Vec2(
          blockerRenderC.posX + blockerRenderC.scaledWidth,
          blockerRenderC.posY
        );

        if (
          this.areIntersecting(
            { p1: tropperVec, p2: playerVec },
            { p1: leftTop, p2: leftBottom }
          ) ||
          this.areIntersecting(
            { p1: tropperVec, p2: playerVec },
            { p1: leftTop, p2: rightTop }
          )
        ) {
          if (this.debug) this.drawDebugger(tropperVec, playerVec, true);
          return false;
        }
      }
    }
    return true;
  }
  areIntersecting(line1, line2) {
    const r = line1.p2.subtract(line1.p1);
    const s = line2.p2.subtract(line2.p1);
    const rXs = r.cross(s);
    const p1diff = line2.p1.subtract(line1.p1);
    const t = p1diff.cross(s) / rXs;
    const u = p1diff.cross(r) / rXs;
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) return true;
    return false;
  }
  drawDebugger(p1, p2, intersecting) {
    canvasContext.strokeStyle = intersecting ? "red " : "green";
    canvasContext.beginPath();
    canvasContext.moveTo(p1.x, p1.y);
    canvasContext.lineTo(p2.x, p2.y);
    canvasContext.stroke();
  }
  getPlayerDirection(player, entity) {
    const playerRenderC = player.components[ComponentTypes.RENDERABLE];
    const entityRenderC = entity.components[ComponentTypes.RENDERABLE];
    return entityRenderC.posX > playerRenderC.posX
      ? { x: -1, y: 0 }
      : { x: 1, y: 0 };
  }
  update() {
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      const renderC = entity.components[ComponentTypes.RENDERABLE];
      if (renderC && entity.components[ComponentTypes.AI]) {
        const player = this.entityManager.getEntitiesOfType("Player")[0];
        const aiC = entity.components[ComponentTypes.AI];
        if (
          player &&
          this.canSeeEachOther(player, entity, entities) &&
          renderC.isOnScreen
        ) {
          if (aiC.lastAction === "cantSee")
            aiC.lastSawTime = new Date().getTime();
          aiC.lastAction = "see";
          if (new Date().getTime() - aiC.lastSawTime > aiC.recognitionSpeed) {
            aiC.lastSawTime = new Date().getTime();
            if (aiC.AIType === "StormTropper") {
              aiC.properties.patrol.direction = this.getPlayerDirection(
                player,
                entity
              );
              if (!entity.components[ComponentTypes.SHOOTER]) {
                entity.addComponent(
                  new ShooterC({
                    toShootAt: player,
                    ...aiC.properties.shooter,
                  })
                );
              }
              if (entity.components[ComponentTypes.PATROL])
                entity.removeComponent(ComponentTypes.PATROL);
            } else if (aiC.AIType === "Drone") {
              if (!entity.components[ComponentTypes.DRONE]) {
                entity.addComponent(
                  new DroneC({
                    toAttack: player,
                    ...aiC.properties.drone,
                  })
                );
              }
            }
          }
        } else {
          aiC.lastAction = "cantSee";
          if (new Date().getTime() - aiC.lastSawTime > aiC.recognitionSpeed) {
            if (aiC.AIType === "StormTropper") {
              if (!entity.components[ComponentTypes.PATROL]) {
                entity.addComponent(
                  new PatrolC({
                    ...aiC.properties.patrol,
                  })
                );
              }
              if (entity.components[ComponentTypes.SHOOTER])
                entity.removeComponent(ComponentTypes.SHOOTER);
            } else if (aiC.AIType === "Drone") {
              if (entity.components[ComponentTypes.DRONE])
                entity.removeComponent(ComponentTypes.DRONE);
              if (entity.components[ComponentTypes.SEEK])
                entity.removeComponent(ComponentTypes.SEEK);
            }
          }
        }
      }
    }
  }
}
