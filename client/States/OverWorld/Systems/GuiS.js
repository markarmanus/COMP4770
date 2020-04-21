import ComponentTypes from "./../../../ComponentTypes";
import Helper from "../../../Helper";
import inGameState from "../../InGame/InGameState";
import LevelEditorState from "../../LevelEditor/LevelEditorState";

export default class GuiS {
  constructor(
    entityManager,
    planetLevels,
    unlockedPlanetLevels,
    planets,
    gameEngine
  ) {
    this.entityManager = entityManager;

    let canvas = document.getElementById("canvas").getContext("2d");
    canvas.font = "40px DistantGalaxy";
    canvas.fillStyle = "yellow";
    this.customPlanetIndex = 0;
    this.planets = planets;
    this.unlockedPlanetLevel = unlockedPlanetLevels;
    this.planetLevels = planetLevels;
    this.gameEngine = gameEngine;
    this.selectedPlanet;
    this.menuText = [];
    this.customLevels = [
      {
        data: {
          name: "Planet100",
        },
      },
      {
        data: {
          name: "Planet200",
        },
      },
      {
        data: {
          name: "Planet300",
        },
      },
      {
        data: {
          name: "Planet400",
        },
      },
    ];

    window.addEventListener("keydown", (event) => {
      if (event.keyCode === 39) {
        this.customPlanetIndex = Math.min(
          this.customPlanetIndex + 1,
          this.customLevels.length - 1
        );
        this.updateCustomLevelName();
      } else if (event.keyCode === 37) {
        this.customPlanetIndex = Math.max(this.customPlanetIndex - 1, 0);
        this.updateCustomLevelName();
      }
    });
  }
  getCustomLevels() {}
  updateCustomLevelName() {
    if (this.selectedPlanet && this.selectedPlanet === "pink") {
      this.menuText[0].text = this.customLevels[
        this.customPlanetIndex
      ].data.name;
    }
  }
  drawMenuText() {
    let canvas = document.getElementById("canvas").getContext("2d");
    canvas.font = "40px DistantGalaxy";
    canvas.fillStyle = "yellow";
    canvas.strokeStyle = "black";
    for (let i = 0; i < this.menuText.length; i++) {
      canvas.fillText(
        this.menuText[i].text,
        this.menuText[i].x,
        this.menuText[i].y
      );
      canvas.strokeText(
        this.menuText[i].text,
        this.menuText[i].x,
        this.menuText[i].y
      );
    }
  }

  checkPlanetClick() {
    if (this.menuText.length) return;
    const mousePosition = window.mouseTracker.getLocation(0);
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      if (entity.descriptor.includes("Planet")) {
        const renderC = entity.components[ComponentTypes.RENDERABLE];
        if (
          renderC.posX < mousePosition.x &&
          renderC.posX + renderC.scaledWidth > mousePosition.x &&
          renderC.posY < mousePosition.y &&
          renderC.posY + renderC.scaledHeight > mousePosition.y
        ) {
          this.drawPlanetMenu(entity);
        }
      }
    }
  }
  checkIfMenuItemClick() {
    const mousePosition = window.mouseTracker.getLocation(0);
    for (const menuItem of this.menuText) {
      const textSize = {
        width: canvasContext.measureText(menuItem.text).width,
        height: 40,
      };
      if (
        menuItem.x < mousePosition.x &&
        menuItem.x + textSize.width > mousePosition.x &&
        menuItem.y - textSize.height < mousePosition.y &&
        menuItem.y > mousePosition.y
      ) {
        menuItem.handler(menuItem.level);
      }
    }
  }
  loadLevel(level) {
    this.gameEngine.addState(new inGameState(level, this.gameEngine));
  }
  drawPlanetMenu(planet) {
    this.menuText = [];

    const planetMenu = Helper.generateEntity(
      planet.descriptor + "Menu",
      this.entityManager
    );
    const planetMenuRenderC = planetMenu.components[ComponentTypes.RENDERABLE];
    planetMenuRenderC.posX = canvas.width / 2 - 256;
    planetMenuRenderC.posY = canvas.height / 2 - 256;
    canvasContext.font = "40px DistantGalaxy";
    canvasContext.fillStyle = "yellow";
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        planetMenu.remove();
        this.menuText = [];
        this.selectedPlanet = undefined;
      }
    });
    let planetType = planet.descriptor.replace("Planet", "").toLowerCase();
    this.selectedPlanet = planetType;
    if (planet.descriptor === "PinkPlanet") {
      this.menuText.push({
        text: this.customLevels[this.customPlanetIndex].data.name,
        x: canvas.width / 2 - 100,
        y: canvas.height / 2,
        handler: (level) => this.loadLevel(level),
        level: this.customLevels[this.customPlanetIndex],
      });
      this.menuText.push({
        text: "create a level",
        x: canvas.width / 2 - 175,
        y: canvas.height / 2 + 150,
        handler: () => this.handleCreateLevel(),
      });
      return;
    }

    let counter = 0;
    for (const level of this.unlockedPlanetLevel[planetType]) {
      const textWidth = canvasContext.measureText(level.data.name).width;
      this.menuText.push({
        text: level.data.name,
        x:
          planetMenuRenderC.posX +
          planetMenuRenderC.scaledWidth / 2 -
          textWidth / 2,
        y:
          planetMenuRenderC.posY +
          planetMenuRenderC.scaledHeight / 2 +
          counter * 100,
        handler: (level) => this.loadLevel(level),
        level: level,
      });
      counter++;
    }
  }
  handleCreateLevel() {
    fetch("/level", {
      method: "POST",
      credentials: "include",
    })
      .then((res) =>
        res.json().then((level) => {
          this.gameEngine.addState(
            new LevelEditorState(level, this.gameEngine)
          );
        })
      )
      .catch((err) => console.log(err));
  }
  update(planets) {
    this.drawMenuText();
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      const renderC = entity.components[ComponentTypes.RENDERABLE];
      const controllsC = entity.components[ComponentTypes.CONTROLABLE];

      if (controllsC) {
        if (controllsC.mouseState.leftClick) {
          if (this.menuText.length) {
            this.checkIfMenuItemClick();
          } else {
            this.checkPlanetClick();
          }
          controllsC.mouseState.leftClick = false;
        }
      }
    }
  }
}
