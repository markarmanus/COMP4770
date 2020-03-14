import GameState from "./../../GameState";
import RenderS from "./Systems/RenderS";
import ControllsS from "./Systems/ControllsS";
import AnimationS from "./Systems/AnimationS";
import MovementS from "./Systems/MovementS";
import RenderableC from "../Components/RenderableC";
import AnimatedC from "../Components/AnimatedC";
import MovableC from "./Components/MovableC";
import MultiSpritesC from "./Components/MultiSpritesC";
import ControllableC from "./Components/ControllableC";
export default class inGameState extends GameState {
  constructor() {
    super();
    this.paused = false;
    this.renderS = new RenderS();
    this.controllsS = new ControllsS();
    this.animationS = new AnimationS();
    this.movementS = new MovementS();
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
      this.movementS.update(this.entityManager);
    }
    this.controllsS.update(this.entityManager);
  }
  //Here we will load the level that the user clicked on.
  loadLevel() {
    const image = new Image();
    image.src =
      "https://allacrost.org/wiki/images/e/eb/Sprite_old_woman_walk.png";
    const player = this.entityManager.addEntity("Player");
    const renderC = new RenderableC(0, 600, 100, 100, image, 32, 64);
    const controllC = new ControllableC({
      leftBttn: "a",
      rightBttn: "d",
      jumpBttn: " "
    });
    const movementC = new MovableC(1, 3, 0.3, 0.9);
    const spritesC = new MultiSpritesC({
      left: 128,
      right: 192,
      idle: 0
    });
    const animationC = new AnimatedC(100, image, 6);
    player.addComponent(renderC);
    player.addComponent(controllC);
    player.addComponent(movementC);
    player.addComponent(animationC);
    player.addComponent(spritesC);
  }
}
