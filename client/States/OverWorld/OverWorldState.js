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
  constructor( gameEngine) {
    super();
    this.gameEngine = gameEngine;
    // an array to hold the planets entites.
    this.planets = [];
    this.renderS = new RenderS(this.entityManager);
    this.controllsS = new ControllsS(this.entityManager);
    this.animationS = new AnimationS(this.entityManager);
    this.movementS = new MovementS(this.entityManager);
    this.guiS = new GuiS(this.entityManager);
    this.init();
  }
  onChoseLevel(level) {
    this.gameEngine.addState(new inGameState(level, this.gameEngine));
  }
  update() {
    super.update();
    this.controllsS.update();
    this.animationS.update();
    this.movementS.update(this.planets);
    this.renderS.update();
  }
  init() {
    // create planets entities here using the Helper.generateEntity
    const redPlanet = Helper.generateEntity("RedPlanet", this.entityManager);
    const redPlanetRenderC = redPlanet.components[ComponentTypes.RENDERABLE];
    redPlanetRenderC.posX = window.innerWidth * .8;
    redPlanetRenderC.posY = window.innerHeight/2;
    const c = Helper.generateEntity("CoruscantText", this.entityManager);
    const cPlanetRenderC = c.components[ComponentTypes.RENDERABLE];
    cPlanetRenderC.posX = window.innerWidth * .8 -60;
    cPlanetRenderC.posY = window.innerHeight/2 + 100;

    const bluePlanet = Helper.generateEntity("BluePlanet", this.entityManager);
    const bluePlanetRenderC = bluePlanet.components[ComponentTypes.RENDERABLE];
    bluePlanetRenderC.posX = window.innerWidth * .56;
    bluePlanetRenderC.posY = window.innerHeight/2;
    const n = Helper.generateEntity("NabooText", this.entityManager);
    const nPlanetRenderC = n.components[ComponentTypes.RENDERABLE];
    nPlanetRenderC.posX = window.innerWidth * .56 -20;
    nPlanetRenderC.posY = window.innerHeight/2 + 100;

    const greenPlanet = Helper.generateEntity("GreenPlanet", this.entityManager);
    const greenPlanetRenderC = greenPlanet.components[ComponentTypes.RENDERABLE];
    greenPlanetRenderC.posX = window.innerWidth * .33;
    greenPlanetRenderC.posY = window.innerHeight/2;
    const o = Helper.generateEntity("OrondiaText", this.entityManager);
    const oPlanetRenderC = o.components[ComponentTypes.RENDERABLE];
    oPlanetRenderC.posX = window.innerWidth * .33 -30;
    oPlanetRenderC.posY = window.innerHeight/2 + 100;

    const pinkPlanet = Helper.generateEntity("PinkPlanet", this.entityManager);
    const pinkPlanetRenderC = pinkPlanet.components[ComponentTypes.RENDERABLE];
    pinkPlanetRenderC.posX = window.innerWidth * .1;
    pinkPlanetRenderC.posY = window.innerHeight/2;
    const l = Helper.generateEntity("LevelEditorText", this.entityManager);
    const lPlanetRenderC = l.components[ComponentTypes.RENDERABLE];
    lPlanetRenderC.posX = window.innerWidth * .1 -100;
    lPlanetRenderC.posY = window.innerHeight/2 + 100;

    this.planets.push(redPlanet);
    this.planets.push(bluePlanet);
    this.planets.push(greenPlanet);
    this.planets.push(pinkPlanet);

    // and position them in the correct places.
    // make sure you add the planets to the entityData file with proper
    //compoents (Renderable).
    // make sure you add the planets to the this.planets list.
    //create an entity to represent baby yoda in his crib
    const yoda = Helper.generateEntity("OverworldYoda", this.entityManager);
    const yodaRenderC = yoda.components[ComponentTypes.RENDERABLE];
    yodaRenderC.posX = window.innerWidth * .47;
    yodaRenderC.posY = window.innerHeight * .1;
    // make sure you add the entity first in the EndityData
    // with thr proper components he will need(renderable, movable, controllable)
  }
}
