import GameState from "./../../GameState";
import RenderS from "./Systems/RenderS";
import ControllsS from "./Systems/ControllsS";
import AnimationS from "./Systems/AnimationS";
import MovementS from "./Systems/MovementS";
import PhysicsS from "./Systems/PhysicsS";
import CollisionS from "./Systems/CollisionS";
import RenderableC from "../Components/RenderableC";
import AnimatedC from "../Components/AnimatedC";
import MovableC from "./Components/MovableC";
import MultiSpritesC from "./Components/MultiSpritesC";
import ControllableC from "./Components/ControllableC";
import CollidableC from "./Components/CollidableC";
import PhysicalC from "./Components/PhysicalC";
import LevelManager from "./LevelManager";
export default class inGameState extends GameState {
  constructor(level) {
    super();
    this.paused = false;
    this.renderS = new RenderS();
    this.controllsS = new ControllsS();
    this.animationS = new AnimationS();
    this.movementS = new MovementS();
    this.collisionS = new CollisionS();
    this.physicsS = new PhysicsS(0.4);
    this.levelManager = new LevelManager(this.entityManager);
    this.level = level;
    this.init();
    window.addEventListener("keydown", e => {
      if (e.key === "p") this.paused = !this.paused;
    });
  }
  update() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    const background = new Image();
    background.src = "https://i.ytimg.com/vi/Ic3ZdD5ko7k/maxresdefault.jpg";
    const patern = canvasContext.createPattern(background, "repeat");
    canvasContext.fillStyle = patern;
    canvasContext.fillRect(
      canvas.width * 2 * -1,
      canvas.height * 2 * -1,
      canvas.width * 10,
      canvas.height * 10
    );
    this.controllsS.update(this.entityManager);
    if (!this.paused) {
      super.update();
      this.animationS.update(this.entityManager);
      this.physicsS.update(this.entityManager);
      this.movementS.update(this.entityManager);
      this.collisionS.update(this.entityManager);
    }
    this.renderS.update(this.entityManager);
  }
  init() {
    this.levelManager.loadLevel(this.level);
  }
}
