import GameState from "./../../GameState";
import RenderS from "../Systems/RenderS";
import ControllsS from "../Systems/ControllsS";
import AnimationS from "../Systems/AnimationS";
import ComponentTypes from "../../ComponentTypes";
import MovementS from "./Systems/MovementS";
import GuiS from "./Systems/GuiS";
import Helper from "../../Helper";
import inGameState from "../InGame/InGameState";
export default class OverWorldState extends GameState {
  constructor(gameEngine) {
    super();
    canvasContext.resetTransform();
    this.gameEngine = gameEngine;
    // an array to hold the planets entites.
    this.planets = [];
    this.renderS = new RenderS(this.entityManager);
    this.controllsS = new ControllsS(this.entityManager);
    this.animationS = new AnimationS(this.entityManager);
    this.movementS = new MovementS(this.entityManager);
    this.planetLevels = {
      red: [],
      blue: [],
      green: [],
    };
    this.unlockedPlanetLevels = {
      red: [],
      blue: [],
      green: [],
    };
    this.init();
    this.guiS = new GuiS(
      this.entityManager,
      this.planetLevels,
      this.unlockedPlanetLevels,
      this.planets,
      this.gameEngine
    );
  }
  onChoseLevel(level) {
    this.gameEngine.addState(new inGameState(level, this.gameEngine));
  }
  update() {
    super.update();
    canvasContext.resetTransform();

    this.controllsS.update();
    this.animationS.update();
    this.movementS.update();
    this.renderS.update();
    this.guiS.update(this.planets);
  }
  init() {
    const offset = Helper.getCanvasOffset();
    for (const level of window.levels) {
      this.planetLevels[level.data.planet].push(level);
      if (user.unlockedLevels >= level.data.number)
        this.unlockedPlanetLevels[level.data.planet].push(level);
    }

    if (this.unlockedPlanetLevels.red.length) {
      const redPlanet = Helper.generateEntity("RedPlanet", this.entityManager);
      const redPlanetRenderC = redPlanet.components[ComponentTypes.RENDERABLE];
      redPlanetRenderC.posX = canvas.width * 0.8 - offset.x;
      redPlanetRenderC.posY = canvas.height / 2 - offset.y;
      const c = Helper.generateEntity("CoruscantText", this.entityManager);
      const cPlanetRenderC = c.components[ComponentTypes.RENDERABLE];
      cPlanetRenderC.posX = canvas.width * 0.8 - 60 - offset.x;
      cPlanetRenderC.posY = canvas.height / 2 + 100 - offset.y;
      this.planets.push(redPlanet);
    }
    if (this.unlockedPlanetLevels.blue.length) {
      const bluePlanet = Helper.generateEntity(
        "BluePlanet",
        this.entityManager
      );
      const bluePlanetRenderC =
        bluePlanet.components[ComponentTypes.RENDERABLE];
      bluePlanetRenderC.posX = canvas.width * 0.56 - offset.x;
      bluePlanetRenderC.posY = canvas.height / 2 - offset.y;
      const n = Helper.generateEntity("NabooText", this.entityManager);
      const nPlanetRenderC = n.components[ComponentTypes.RENDERABLE];
      nPlanetRenderC.posX = canvas.width * 0.56 - 20 - offset.x;
      nPlanetRenderC.posY = canvas.height / 2 + 100 - offset.y;
      this.planets.push(bluePlanet);
    }

    if (this.unlockedPlanetLevels.green.length) {
      const greenPlanet = Helper.generateEntity(
        "GreenPlanet",
        this.entityManager
      );
      const greenPlanetRenderC =
        greenPlanet.components[ComponentTypes.RENDERABLE];
      greenPlanetRenderC.posX = canvas.width * 0.33 - offset.x;
      greenPlanetRenderC.posY = canvas.height / 2 - offset.y;
      const o = Helper.generateEntity("OrondiaText", this.entityManager);
      const oPlanetRenderC = o.components[ComponentTypes.RENDERABLE];
      oPlanetRenderC.posX = canvas.width * 0.33 - 30 - offset.x;
      oPlanetRenderC.posY = canvas.height / 2 + 100 - offset.y;
      this.planets.push(greenPlanet);
    }

    const pinkPlanet = Helper.generateEntity("PinkPlanet", this.entityManager);
    const pinkPlanetRenderC = pinkPlanet.components[ComponentTypes.RENDERABLE];
    pinkPlanetRenderC.posX = canvas.width * 0.1 - offset.x;
    pinkPlanetRenderC.posY = canvas.height / 2 - offset.y;
    const l = Helper.generateEntity("LevelEditorText", this.entityManager);
    const lPlanetRenderC = l.components[ComponentTypes.RENDERABLE];
    lPlanetRenderC.posX = canvas.width * 0.1 - 100 - offset.x;
    lPlanetRenderC.posY = canvas.height / 2 + 100 - offset.y;
    this.planets.push(pinkPlanet);

    const yoda = Helper.generateEntity("OverworldYoda", this.entityManager);
    const yodaRenderC = yoda.components[ComponentTypes.RENDERABLE];
    yodaRenderC.posX = canvas.width * 0.47 - offset.x;
    yodaRenderC.posY = canvas.height * 0.1 - offset.y;
  }
}
