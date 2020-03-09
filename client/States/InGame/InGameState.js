import GameState from "./../../GameState";
import RenderS from "./Systems/RenderS";
import ControllsS from "./Systems/ControllsS";
import AnimationS from "./Systems/AnimationS";
import ComponentTypes from "../../ComponentTypes";
import RenderableC from "../Components/RenderableC";
import ControllableC from "./Components/ControllableC";
export default class inGameState extends GameState {
  constructor() {
    super();
    this.paused = false;
    this.renderS = new RenderS();
    this.controllerS = new ControllsS();
    this.animationS = new AnimationS();
    this.loadLevel();
  }
  update() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    const background = new Image();
    background.src = "https://i.ytimg.com/vi/Ic3ZdD5ko7k/maxresdefault.jpg";
    canvasContext.drawImage(background, 0, 0);
    if (!this.paused) {
      super.update();
      this.renderS.update(this.entityManager);
      this.animationS.update(this.entityManager);
    }
    this.controllerS.update(this.entityManager);
  }
  //Here we will load the level that the user clicked on.
  loadLevel() {
    const player = this.entityManager.addEntity("Player");
    const renderC = new RenderableC(0, 600, 100, 100, null, 0, 0);

    const controllC = new ControllableC(
      {
        leftBttn: "a",
        rightBttn: "d",
        jumpBttn: " "
      },
      10
    );
    player.addComponent(renderC);
    player.addComponent(controllC);
  }
}
