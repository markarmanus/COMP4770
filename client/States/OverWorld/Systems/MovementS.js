import ComponentTypes from "./../../../ComponentTypes";
export default class MoementS {
  constructor(entityManager) {
    this.entityManager = entityManager;
  }

  update(planets) {
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      const controllsC = entity.components[ComponentTypes.CONTROLABLE];
      if (controllsC){
      //to access the last mouse location
      console.log(window.mouseTracker.getLocation(0));
      // to access the keys that are currently pressed.
      console.log(controllsC.bttnsState);
      // to access the mouse if right click or left click on mouse is currently clicked.
      console.log(controllsC.mouseState);

      // here you would detect that the user has pressed either (a) to move left
      // or (d) to move right and move him to the correct planet
      redPlanet = planets[3];
      const redPlanetRenderC = redPlanet.components[ComponentTypes.RENDERABLE];
      redPlanetRenderC.posY
      }

    }
  }
}
