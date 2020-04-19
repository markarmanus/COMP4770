import ComponentTypes from "./../../../ComponentTypes";
export default class MoementS {
  constructor(entityManager) {
    this.entityManager = entityManager;
  }

  setVelocityWithinBounds(velocity, maxVelocity) {
    const negativeMax = -1 * maxVelocity;
    velocity =
      velocity > maxVelocity
        ? maxVelocity
        : velocity < negativeMax
        ? negativeMax
        : velocity;
    return velocity;
  }

  addFriction(direction, currentVelocity, friction, velocity) {
    let frictionForce = velocity * friction;
    frictionForce = direction === "left" ? -1 * frictionForce : frictionForce;
    let newVelocity = currentVelocity + frictionForce;
    if (direction === "left" && newVelocity < 0) newVelocity = 0;
    if (direction === "right" && newVelocity > 0) newVelocity = 0;
    return newVelocity;
  }

  update(planets) {
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      const renderC = entity.components[ComponentTypes.RENDERABLE];
      const movementC = entity.components[ComponentTypes.MOVABLE];
      const controllsC = entity.components[ComponentTypes.CONTROLABLE];
      if (renderC && movementC && controllsC){
      //to access the last mouse location
      console.log(window.mouseTracker.getLocation(0));
      // to access the keys that are currently pressed.
      console.log(controllsC.bttnsState);
      // to access the mouse if right click or left click on mouse is currently clicked.
      console.log(controllsC.mouseState);

      // here you would detect that the user has pressed either (a) to move left
      // or (d) to move right and move him to the correct planet
      

      let redPlanet = planets[0];
      let redPlanetRenderC = redPlanet.components[ComponentTypes.RENDERABLE];
      let redPlanetPosition = [redPlanetRenderC.posX, redPlanetRenderC.posY];

      let bluePlanet = planets[1];
      let bluePlanetRenderC = bluePlanet.components[ComponentTypes.RENDERABLE];
      let bluePlanetPosition = [bluePlanetRenderC.posX, bluePlanetRenderC.posY];

      let greenPlanet = planets[2];
      let greenPlanetRenderC = greenPlanet.components[ComponentTypes.RENDERABLE];
      let greenPlanetPosition = [greenPlanetRenderC.posX, greenPlanetRenderC.posY];

      let pinkPlanet = planets[3];
      let pinkPlanetRenderC = pinkPlanet.components[ComponentTypes.RENDERABLE];
      let pinkPlanetPosition = [pinkPlanetRenderC.posX, pinkPlanetRenderC.posY];

        const rightBttn = controllsC.bttnsState[controllsC.rightBttn];
        const leftBttn = controllsC.bttnsState[controllsC.leftBttn];

        if (rightBttn) {
          movementC.currentVelocity +=
            movementC.velocity * movementC.accerlationSpeed;
        }
        if (leftBttn) {
          movementC.currentVelocity -=
            movementC.velocity * movementC.accerlationSpeed;
        }

        movementC.currentVelocity = this.setVelocityWithinBounds(
          movementC.currentVelocity,
          movementC.maxVelocity
        );

      }

    }
  }
}
