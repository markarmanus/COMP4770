import ComponentTypes from "../../../ComponentTypes";

export default class CameraS {
  constructor(limit, entityManager) {
    this.entityManager = entityManager;

    this.limit = limit;

    this.entityToFollow = null;
  }
  update() {
    const renderC = this.entityToFollow.components[ComponentTypes.RENDERABLE];

    if (this.entityToFollow && renderC) {
      canvasContext.resetTransform();
      let translate = {
        x: canvas.width / 2 - renderC.posX - renderC.scaledWidth,
        y: canvas.height / 2 - renderC.posY,
      };
      if (translate.y < this.limit.min.y) translate.y = this.limit.min.y;
      // if (translate.x < this.limit.min.x) translate.x = this.limit.min.x;
      if (translate.y > this.limit.max.y) translate.y = this.limit.y;
      if (translate.x > this.limit.max.x) translate.x = this.limit.x;

      canvasContext.translate(translate.x, translate.y);
    }
  }
  follow(entity) {
    this.entityToFollow = entity;
  }
}
