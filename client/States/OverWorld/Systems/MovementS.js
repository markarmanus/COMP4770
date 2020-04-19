import ComponentTypes from "./../../../ComponentTypes";
export default class MoementS {
  constructor(entityManager) {
    this.entityManager = entityManager;
  }

  update(planets) {
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      const renderC = entity.components[ComponentTypes.RENDERABLE];
      const movementC = entity.components[ComponentTypes.MOVABLE];
      const controllsC = entity.components[ComponentTypes.CONTROLABLE];
      if (renderC && movementC && controllsC){
      //to access the last mouse location
    //  console.log(window.mouseTracker.getLocation(0));
      // to access the keys that are currently pressed.
    //  console.log(controllsC.bttnsState);
      // to access the mouse if right click or left click on mouse is currently clicked.
     // console.log(controllsC.mouseState);

      // here you would detect that the user has pressed either (a) to move left
      // or (d) to move right and move him to the correct planet

      //

      //Moving yoda, remove for now
    //   const rightBttn = controllsC.bttnsState[controllsC.rightBttn];
    //   const leftBttn = controllsC.bttnsState[controllsC.leftBttn];
    //   const upBttn = controllsC.bttnsState[controllsC.upBttn];
    //   const downBttn = controllsC.bttnsState[controllsC.downBttn];
    //
    //   if (rightBttn) {
    //     movementC.currentVelocity +=
    //       movementC.velocity * movementC.accerlationSpeed;
    //   }
    //   if (leftBttn) {
    //     movementC.currentVelocity -=
    //       movementC.velocity * movementC.accerlationSpeed;
    //   }
    //
    //   movementC.currentVelocity = this.setVelocityWithinBounds(
    //     movementC.currentVelocity,
    //     movementC.maxVelocity
    // );
    //     renderC.posX += movementC.currentVelocity;
      }

    }
  }
}
