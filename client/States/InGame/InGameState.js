import GameState from "./../../GameState";
import RenderS from "../Systems/RenderS";
import ControllsS from "../Systems/ControllsS";
import AnimationS from "../Systems/AnimationS";
import DeathS from "./Systems/DeathS";
import MovementS from "./Systems/MovementS";
import PhysicsS from "./Systems/PhysicsS";
import CollisionS from "./Systems/CollisionS";
import GuiS from "./Systems/GuiS";
import BehaviourS from "./Systems/BehaviourS";
import CameraS from "./Systems/CameraS";
import WeaponsS from "./Systems/WeaponsS";
import AiS from "./Systems/AiS";
import LevelManager from "./LevelManager";
import Helper from "./Helper";
export default class inGameState extends GameState {
  constructor(level) {
    super();
    this.paused = false;
    this.renderS = new RenderS(this.entityManager);
    this.controllsS = new ControllsS(this.entityManager);
    this.animationS = new AnimationS(this.entityManager);
    this.DeathS = new DeathS(this.entityManager);
    this.movementS = new MovementS(this.entityManager);
    this.collisionS = new CollisionS(this.entityManager);
    this.physicsS = new PhysicsS(0.4, this.entityManager);
    this.behaviourS = new BehaviourS(this.entityManager);
    this.cameraS = new CameraS(
      { min: { x: -5000, y: -300 }, max: { x: 5000, y: 5000 } },
      this.entityManager
    );
    this.weaponsS = new WeaponsS(this.entityManager);
    this.guiS = new GuiS(0.55, this.entityManager);
    this.levelManager = new LevelManager(this.entityManager, this.cameraS);
    this.aiS = new AiS(this.entityManager);
    this.level = level;
    this.init();
    window.addEventListener("keydown", (e) => {
      if (e.key === "p") this.paused = !this.paused;
    });
    this.debug = false;
    window.addEventListener("keydown", (e) => {
      if (e.key === "P") {
        this.debug = !this.debug;
      }
    });
  }
  update() {
    this.controllsS.update();
    let bla = "hi";
    if (!this.paused) {
      super.update();
      this.guiS.update();

      this.animationS.update();

      this.behaviourS.update();

      this.aiS.update();

      this.DeathS.update();

      this.physicsS.update();

      this.movementS.update();

      this.weaponsS.update();

      this.collisionS.update();

      this.cameraS.update();
    }
    this.renderS.update();
  }
  init() {
    this.levelManager.loadLevel(this.level);
    Helper.setInitialLevelGrid(this.entityManager);
  }
}
