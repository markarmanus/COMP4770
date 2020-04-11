import GameState from "../../GameState";
import RenderS from "../Systems/RenderS";
import ControllableC from "../Components/ControllableC";
import ControllsS from "../Systems/ControllsS";
import AnimationS from "../Systems/AnimationS";
import GuiS from "./Systems/GuiS";
import CameraS from "./Systems/CameraS";
import LevelManager from "./LevelManager";
import RenderableC from "../Components/RenderableC";
import Images from "../../Assets/ImageGenerator";
export default class LevelEditorState extends GameState {
  constructor(level) {
    super();
    this.paused = false;
    this.renderS = new RenderS();
    this.controllsS = new ControllsS();
    this.animationS = new AnimationS();
    this.cameraS = new CameraS(10);
    this.guiS = new GuiS(this.entityManager);
    this.levelManager = new LevelManager(this.entityManager, this.cameraS);
    this.level = level;
    this.init();
    window.addEventListener("keydown", (e) => {
      if (e.key === "p") this.paused = !this.paused;
    });
  }
  update() {
    this.controllsS.update(this.entityManager);
    if (!this.paused) {
      super.update();
      this.animationS.update(this.entityManager);
      this.cameraS.update(this.entityManager);
    }
    this.renderS.update(this.entityManager);
    this.guiS.update(this.entityManager);
  }
  init() {
    this.levelManager.loadLevel(this.level);
    let levelEditor = this.entityManager.addEntity("LevelEditor");
    levelEditor.addComponent(
      new ControllableC({
        leftBttn: "a",
        rightBttn: "d",
        upBttn: "w",
        downBttn: "s",
      })
    );
  }
}
