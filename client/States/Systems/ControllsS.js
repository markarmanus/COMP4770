import ComponentTypes from "../../ComponentTypes";

export default class ControllsS {
  constructor(entityManager) {
    this.entityManager = entityManager;
    this.clickedBttns = {};
    this.fistClickedAt = {};
    this.lastClickedAt = {};
    this.doubleClick = {};
    this.mouseState = {};
    canvas.addEventListener("mousedown", (e) => {
      if (e.button === 0) this.mouseState.leftClick = true;
      if (e.button === 2) {
        this.mouseState.rightClick = true;
      }
    });
    canvas.addEventListener("mouseup", (e) => {
      if (e.button === 0) this.mouseState.leftClick = false;
      if (e.button === 2) this.mouseState.rightClick = false;
    });
    window.addEventListener("keydown", (e) => {
      const clickTime = new Date().getTime();
      const doubleClick = clickTime - this.lastClickedAt[e.key] < 200;
      if (doubleClick) {
        this.doubleClick[e.key] = true;
        setTimeout(() => (this.doubleClick[e.key] = false), 100);
      }
      if (!this.clickedBttns[e.key]) this.fistClickedAt[e.key] = clickTime;
      if (!this.clickedBttns[e.key] && !doubleClick)
        this.lastClickedAt[e.key] = clickTime;
      this.clickedBttns[e.key] = true;
    });
    window.addEventListener("keyup", (e) => {
      this.clickedBttns[e.key] = false;
      this.fistClickedAt[e.key] = false;
      this.doubleClick[e.key] = false;
    });
  }
  update() {
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      if (entity.components[ComponentTypes.CONTROLABLE]) {
        const controllC = entity.components[ComponentTypes.CONTROLABLE];
        for (let [key, value] of Object.entries(this.clickedBttns)) {
          if (controllC.bttnsState[key] !== undefined) {
            controllC.bttnsState[key] = value;
            controllC.bttnsDblClickState[key] = this.doubleClick[key];
            controllC.bttnsHoldState[key] =
              new Date().getTime() - this.fistClickedAt[key] > 150 && value
                ? true
                : false;
          }
        }
        controllC.mouseState = this.mouseState;
      }
    }
  }
}
