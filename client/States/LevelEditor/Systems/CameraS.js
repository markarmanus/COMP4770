import ComponentTypes from "../../../ComponentTypes";

export default class CameraS {
  constructor(speed, entityManager) {
    this.speed = speed;
    this.entityManager = entityManager;
  }
  update(entityManager) {
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      if (entity.components[ComponentTypes.CONTROLABLE]) {
        const controlC = entity.components[ComponentTypes.CONTROLABLE];
        if (controlC.bttnsState[controlC.leftBttn]) {
          canvasContext.translate(this.speed, 0);
        }
        if (controlC.bttnsState[controlC.rightBttn]) {
          canvasContext.translate(-1 * this.speed, 0);
        }
        if (controlC.bttnsState[controlC.upBttn]) {
          canvasContext.translate(0, this.speed);
        }
        if (controlC.bttnsState[controlC.downBttn]) {
          canvasContext.translate(0, -1 * this.speed);
        }
      }
    }
  }
}
