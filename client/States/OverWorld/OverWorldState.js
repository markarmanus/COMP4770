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

    const bluePlanet = Helper.generateEntity("BluePlanet", this.entityManager);
    const bluePlanetRenderC = bluePlanet.components[ComponentTypes.RENDERABLE];
    bluePlanetRenderC.posX = window.innerWidth * .56;
    bluePlanetRenderC.posY = window.innerHeight/2;

    const greenPlanet = Helper.generateEntity("GreenPlanet", this.entityManager);
    const greenPlanetRenderC = greenPlanet.components[ComponentTypes.RENDERABLE];
    greenPlanetRenderC.posX = window.innerWidth * .33;
    greenPlanetRenderC.posY = window.innerHeight/2;

    const pinkPlanet = Helper.generateEntity("PinkPlanet", this.entityManager);
    const pinkPlanetRenderC = pinkPlanet.components[ComponentTypes.RENDERABLE];
    pinkPlanetRenderC.posX = window.innerWidth * .1;
    pinkPlanetRenderC.posY = window.innerHeight/2;

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
