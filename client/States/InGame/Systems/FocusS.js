import ComponentTypes from "./../../../ComponentTypes";

export default class FocusS {
  constructor(entityManager) {
    this.entityManager = entityManager;
  }

  update() {
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      const renderC = entity.components[ComponentTypes.RENDERABLE];
      const focusC = entity.components[ComponentTypes.FOCUS];
      if (renderC && focusC) {
        if (focusC.lastFocus !== focusC.currentFocus) {
          focusC.timeSinceReGen = new Date().getTime();
        }
        if (new Date().getTime() - focusC.timeSinceReGen > focusC.timeToReGen) {
          if (focusC.currentFocus < focusC.maxFocus) focusC.currentFocus++;
        }
        focusC.lastFocus = focusC.currentFocus;
      }
    }
  }
}
