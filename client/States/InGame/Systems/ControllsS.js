import ComponentTypes from "./../../../ComponentTypes";

export default class ControllsS {
  constructor() {
    this.clickedBttns = {};
    // const move = key => {
    //   if (this.clickedBttns[key] >= 1) {
    //     this.clickedBttns[key] = 1;
    //     clearInterval(move);
    //     return;
    //   }
    //   this.clickedBttns[key] += 0.1;
    // };
    // const stop = (clickedBttns, key) => {
    //   if (this.clickedBttns[e.key] <= 0) {
    //     this.clickedBttns[e.key] = 0;
    //     clearInterval(stop);
    //     return;
    //   }
    //   this.clickedBttns[e.key] -= 0.1;
    // };
    var move;
    var stop;
    window.addEventListener("keydown", async e => {
      console.log("keydown");
      if (move != undefined) await clearInterval(move);
      if (this.clickedBttns[e.key] === undefined) this.clickedBttns[e.key] = 0;
      move = setInterval(() => {
        if (this.clickedBttns[e.key] >= 1) {
          this.clickedBttns[e.key] = 1;
          clearInterval(move);
          return;
        }
        console.log("move");
        this.clickedBttns[e.key] = this.clickedBttns[e.key] + 0.1;
      }, 100);
    });
    window.addEventListener("keyup", e => {
      console.log("hi");
      clearInterval(move);
      stop = setInterval(() => {
        if (this.clickedBttns[e.key] <= 0) {
          this.clickedBttns[e.key] = 0;
          clearInterval(stop);
          return;
        }
        console.log("stop");

        this.clickedBttns[e.key] = this.clickedBttns[e.key] - 0.1;
      }, 25);
    });
  }
  update(entityManager) {
    const entities = entityManager.getEntities();
    for (const entity of entities) {
      if (
        entity.components[ComponentTypes.CONTROLABLE] &&
        entity.components[ComponentTypes.RENDERABLE]
      ) {
        const controllComponent = entity.components[ComponentTypes.CONTROLABLE];
        const renderComponent = entity.components[ComponentTypes.RENDERABLE];
        console.log(this.clickedBttns[controllComponent.leftBttn]);
        console.log(this.clickedBttns[controllComponent.rightBttn]);
        if (this.clickedBttns[controllComponent.leftBttn]) {
          renderComponent.posX -=
            controllComponent.speed *
            this.clickedBttns[controllComponent.leftBttn];
        }
        if (this.clickedBttns[controllComponent.rightBttn]) {
          renderComponent.posX +=
            controllComponent.speed *
            this.clickedBttns[controllComponent.rightBttn];
        }
        if (this.clickedBttns[controllComponent.jumpBttn]) {
          //Jump Logic
        }
      }
    }
  }
}
