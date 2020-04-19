import GameState from "./../../GameState";
import RenderS from "../Systems/RenderS";
import ControllsS from "../Systems/ControllsS";
import AnimationS from "../Systems/AnimationS";
import DeathS from "./Systems/DeathS";
import MovementS from "./Systems/MovementS";
import CheckPointS from "./Systems/CheckPointS";
import ComponentTypes from "../../ComponentTypes";
import PhysicsS from "./Systems/PhysicsS";
import PickUpS from "./Systems/PickUpS";
import CollisionS from "./Systems/CollisionS";
import GuiS from "./Systems/GuiS";
import BehaviourS from "./Systems/BehaviourS";
import CameraS from "./Systems/CameraS";
import WeaponsS from "./Systems/WeaponsS";
import AiS from "./Systems/AiS";
import LevelManager from "./LevelManager";
import Helper from "../../Helper";
export default class inGameState extends GameState {
  constructor(level, gameEngine) {
    super();
    this.paused = false;
    this.gameEngine = gameEngine;
    this.levelEnded = false;
    const cameraLimit = {
      min: { x: -5000, y: -200 },
      max: { x: 5000, y: 3000 },
    };
    this.cameraS = new CameraS(cameraLimit, this.entityManager);
    this.levelManager = new LevelManager(
      this.entityManager,
      this.cameraS,
      level
    );
    this.renderS = new RenderS(this.entityManager);
    this.controllsS = new ControllsS(this.entityManager);
    this.animationS = new AnimationS(this.entityManager);
    this.DeathS = new DeathS(this.entityManager, cameraLimit);
    this.movementS = new MovementS(this.entityManager);
    this.checkPointS = new CheckPointS(this.entityManager, this.levelManager);
    this.collisionS = new CollisionS(this.entityManager);
    this.physicsS = new PhysicsS(0.4, this.entityManager);
    this.pickUpS = new PickUpS(this.entityManager);
    this.behaviourS = new BehaviourS(this.entityManager);

    this.weaponsS = new WeaponsS(this.entityManager);
    this.guiS = new GuiS(
      0.55,
      this.entityManager,
      () => this.endLevel(),
      () => this.unpause()
    );

    this.aiS = new AiS(this.entityManager);
    this.level = level;
    this.init();
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.paused = !this.paused;
    });
    this.debug = false;
    window.addEventListener("keydown", (e) => {
      if (e.key === "P") {
        this.endLevel();
      }
    });
  }
  endLevel() {
    this.levelEnded = true;
  }
  unpause() {
    this.paused = false;
  }
  setBackground() {
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
  }
  update() {
    super.update();
    this.setBackground();
    this.controllsS.update();
    this.guiS.update(this.paused);

    if (!this.paused || this.levelEnded) {
      this.animationS.update();

      this.behaviourS.update();

      this.aiS.update();

      this.checkPointS.update();

      this.DeathS.update();

      this.physicsS.update();

      this.movementS.update();

      this.pickUpS.update();

      this.weaponsS.update();

      this.collisionS.update();

      this.cameraS.update();
    }

    this.renderS.update();
    if (this.levelEnded)
      canvas.style = `opacity: ${canvas.style.opacity - 0.01}`;
    if (canvas.style.opacity < 0 && this.levelEnded) {
      this.gameEngine.popState(1);
      this.gameEngine.addState(new inGameState(levels[0], this.gameEngine));
      canvas.style = `opacity: 1`;
    }
  }
  init() {
    this.levelManager.loadLevel();
    Helper.setInitialLevelGrid(this.entityManager);
  }
}
