import ComponentTypes from "./../../../ComponentTypes";
import Vec2 from "../Vec2";
export default class AiS {
  constructor() {
    this.debug = false;
    window.addEventListener("keydown", (e) => {
      if (e.key === "C") {
        this.debug = !this.debug;
      }
    });
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
  update(entityManager) {
    const entities = entityManager.getEntities();
    main: for (const entity of entities) {
      if (
        entity.components[ComponentTypes.RENDERABLE]?.isOnScreen &&
        entity.descriptor === "StormTropper"
      ) {
        const renderC = entity.components[ComponentTypes.RENDERABLE];
        const aiC = entity.components[ComponentTypes.AI];
        const player = entityManager.getEntitiesOfType("Player")[0];
        const playerRencerC = player.components[ComponentTypes.RENDERABLE];
        const playerVisionOffset = playerRencerC.visionOffset
          ? playerRencerC.visionOffset
          : { x: 0, y: 0 };
        const entityVisionOffset = renderC.visionOffset
          ? renderC.visionOffset
          : { x: 0, y: 0 };
        const tropperVec = new Vec2(
          renderC.posX + entityVisionOffset.x,
          renderC.posY + entityVisionOffset.x
        );
        const playerVec = new Vec2(
          playerRencerC.posX + playerVisionOffset.x,
          playerRencerC.posY + playerVisionOffset.y
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
            if (this.debug) this.drawDebugger(leftTop, leftBottom, false);

            if (
              this.areIntersecting(
                { p1: tropperVec, p2: playerVec },
                { p1: leftTop, p2: leftBottom }
              )
            ) {
              console.log("hi");
              if (this.debug) this.drawDebugger(tropperVec, playerVec, true);
              continue main;
            }
          }
        }
      }
    }
  }
}
