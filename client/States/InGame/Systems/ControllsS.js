import ComponentTypes from "./../../../ComponentTypes";

export default class ControllsS {
  constructor() {
    this.clickedBttns = {};
    window.addEventListener("keydown", e => {
      this.clickedBttns[e.key] = true;
    });
    window.addEventListener("keyup", e => {
      this.clickedBttns[e.key] = false;
    });
  }
  update(entityManager) {
    const entities = entityManager.getEntities();
    for (const entity of entities) {
      if (
        entity.components[ComponentTypes.CONTROLABLE] &&
        entity.components[ComponentTypes.RENDERABLE]
      ) {
        const controllC = entity.components[ComponentTypes.CONTROLABLE];
        for (let [key, value] of Object.entries(this.clickedBttns)) {
          if (controllC.bttnsState[key] !== undefined) {
            controllC.bttnsState[key] = value;
          }
        }
      }
    }
  }
}
