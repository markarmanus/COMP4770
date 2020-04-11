import GameState from "./../../GameState";
import RenderS from "./Systems/RenderS";
import ControllsS from "./Systems/ControllsS";
import AnimationS from "./Systems/AnimationS";
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
export default class inGameState extends GameState {
  constructor(level) {
    super();
    this.paused = false;
    this.renderS = new RenderS();
    this.controllsS = new ControllsS();
    this.animationS = new AnimationS();
    this.DeathS = new DeathS();
    this.movementS = new MovementS();
    this.collisionS = new CollisionS();
    this.physicsS = new PhysicsS(0.4);
    this.behaviourS = new BehaviourS();
    this.cameraS = new CameraS({ x: 2000, y: 5000 });
    this.weaponsS = new WeaponsS();
    this.guiS = new GuiS(0.55);
    this.levelManager = new LevelManager(this.entityManager, this.cameraS);
    this.aiS = new AiS();
    this.level = level;
    this.init();
    window.addEventListener("keydown", (e) => {
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
      this.guiS.update(this.entityManager);
      this.animationS.update(this.entityManager);
      this.behaviourS.update(this.entityManager);
      this.aiS.update(this.entityManager);
      this.DeathS.update(this.entityManager);
      this.physicsS.update(this.entityManager);
      this.movementS.update(this.entityManager);
      this.weaponsS.update(this.entityManager);
      this.collisionS.update(this.entityManager);
      this.cameraS.update();
    }
    this.renderS.update(this.entityManager);
  }
  init() {
    this.levelManager.loadLevel(this.level);
  }
}
