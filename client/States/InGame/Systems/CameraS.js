import ComponentTypes from "../../../ComponentTypes";

export default class CameraS {
  constructor(limit) {
    this.limit = limit;

    this.entityToFollow = null;
  }
  update() {
    if (
      this.entityToFollow &&
      this.entityToFollow.components[ComponentTypes.RENDERABLE]
    ) {
      const renderC = this.entityToFollow.components[ComponentTypes.RENDERABLE];
      canvasContext.resetTransform();
      let translate = {
        x: canvas.width / 2 - renderC.posX - renderC.scaledWidth,
        y: canvas.height / 2 - renderC.posY,
      };
      if (translate.y < 0) translate.y = 0;
      if (translate.x < 0) translate.x = 0;
      if (translate.y > this.limit.y) translate.y = this.limit.y;
      if (translate.x > this.limit.x) translate.x = this.limit.x;

      canvasContext.translate(translate.x, translate.y);
    }
  }
  follow(entity) {
    this.entityToFollow = entity;
  }
}
