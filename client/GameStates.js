class GameState {
  constructor() {
    this.posx = 0;
    this.posy = 0;
    this.entityManager = new EntityManager(); // each gamestate typically has a entity manager
    // usage: x=eManager.addEntity("<insert description>")
    // This will return a reference to the entity which is useful for setting up components at entity creation
  }

  update() {
    // this should call all the relevant systems in the gamestate
    this.entityManager.update();
    this.movement();
    this.render();
  }

  movement() {
    // This movement system should operate on entities with movement components
    // example: (simple movement for render example, this is not component based)

    this.posx++;
    this.posy++;
  }

  render() {
    // this should render all relavent items of a state
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 1280, 720); //clears screen

    // Use ctx to manipulate the canvas
    // example:
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(this.posx, this.posy, 150, 75);
  }
}
