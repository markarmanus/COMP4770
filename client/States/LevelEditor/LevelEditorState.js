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
import ComponentTypes from "../../ComponentTypes";
import inGameState from "../../States/InGame/InGameState";
import Helper from "../../Helper";
export default class LevelEditorState extends GameState {
  constructor(level, gameManager) {
    super();
    this.gameManager = gameManager;
    this.paused = false;
    this.currentPlanet = level.data.planet;
    this.currentPlanetIndex = 0;
    this.planets = ["red", "blue", "green"];
    this.renderS = new RenderS(this.entityManager);
    console.log(level);
    this.isActive = true;
    this.controllsS = new ControllsS(this.entityManager);
    this.animationS = new AnimationS(this.entityManager);
    this.cameraS = new CameraS(10, this.entityManager);
    this.guiS = new GuiS(
      this.entityManager,
      () => this.nextPlanet(),
      () => this.saveLevel(),
      () => this.testLevel(),
      (value) => this.togglePause(value),
      () => this.exit()
    );
    this.levelManager = new LevelManager(this.entityManager, this.cameraS);
    this.level = [];
    this.level = level;
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isActive) this.paused = !this.paused;
    });
    this.init();
  }
  exit() {
    this.isActive = false;
    this.togglePause(false);
    this.gameManager.popState(1);
  }
  testLevel() {
    const level = this.generateLevelModel();
    this.isActive = false;
    console.log(level);
    this.gameManager.addState(new inGameState(level, this.gameManager));
  }
  nextPlanet() {
    this.currentPlanetIndex++;
    this.currentPlanet = this.planets[
      this.currentPlanetIndex % this.planets.length
    ];
  }
  saveLevel() {
    const level = this.generateLevelModel();
    console.log(level);
    fetch("/level", {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        level: level,
      }),
    }).then(() => alert("Success"));
  }
  generateLevelModel() {
    const entities = this.entityManager.getEntities();
    console.log(this.level);
    const level = {
      _id: this.level._id,
      data: {
        planet: this.currentPlanet,
        name: this.level.data.name,
        entities: [],
      },
    };
    for (const entity of entities) {
      const renderC = entity.components[ComponentTypes.RENDERABLE];
      if (
        renderC &&
        !entity.descriptor.includes("Selector") &&
        !entity.descriptor.includes("Menu")
      ) {
        level.data.entities.push({
          posX: renderC.posX,
          posY: renderC.posY,
          type: entity.descriptor,
        });
      }
    }
    return level;
  }
  setBackground() {
    const canvasOffset = Helper.getCanvasOffset();
    const background = Images[`${this.currentPlanet}Bg`];
    canvasContext.drawImage(
      background,
      canvasOffset.x * -1,
      canvasOffset.y * -1,
      canvas.width,
      canvas.height
    );
  }
  togglePause(value) {
    if (value) {
      this.paused = value;
    } else {
      this.paused = !this.paused;
    }
  }
  update() {
    this.setBackground();
    super.update();
    this.isActive = true;
    if (!this.paused) {
      this.cameraS.update();
      this.animationS.update();
    }
    this.controllsS.update();
    this.guiS.update(this.paused, this.currentPlanet, this.isActive);
    this.renderS.update();
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
