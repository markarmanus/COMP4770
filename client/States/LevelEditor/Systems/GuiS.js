import ComponentTypes from "../../../ComponentTypes";
import Images from "../../../Assets/ImageGenerator";
import EntityData from "../../../Configuration/EntityData";
import RenderableC from "../../Components/RenderableC";
import Helper from "../../../Helper";

export default class GuiS {
  constructor(
    entityManager,
    nextPlanet,
    saveLevel,
    testLevel,
    togglePause,
    exit
  ) {
    this.grid = true;
    this.entityManager = entityManager;
    this.selectedEntity;
    this.pauseMenu = [];
    this.exit = exit;
    this.togglePause = togglePause;
    this.gridSize = 32;
    this.isActive = true;
    this.defaultPadding = {
      x: 20,
      y: 20,
    };
    this.canvasOffset = {};
    this.updateCanvasOffset();

    this.selector = this.initializeSelector();
    window.addEventListener("keydown", (e) => {
      if (this.isActive) {
        if (e.key === "C") {
          this.grid = !this.grid;
        } else if (e.keyCode === 38) {
          this.gridSize = Math.min(this.gridSize + 8, 64);
        } else if (e.keyCode === 40) {
          this.gridSize = Math.max(this.gridSize - 8, 8);
        } else if (e.key === "r") {
          if (this.selectedEntity) this.selectedEntity.remove();
        } else if (e.key === "b") {
          nextPlanet();
        } else if (e.key === "S") {
          if (this.isActive) saveLevel();
        } else if (e.key === "q" && e.ctrlKey) {
          this.togglePause(false);
          testLevel();
        }
      }
    });
  }
  updateFloor(planet) {
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      const renderC = entity.components[ComponentTypes.RENDERABLE];
      if (
        (renderC && entity.descriptor === "Floor") ||
        entity.descriptor === "FloorSelector"
      ) {
        renderC.image = Images[`${planet}Floor`];
      }
    }
  }
  initializeSelector() {
    let entitySize = 40;
    let padding = {
      x: 5,
      y: 10,
    };
    let width = canvas.width - this.defaultPadding.x;
    let height = entitySize + padding.y * 2;
    this.entityManager;
    let entities = [];
    let x = this.defaultPadding.x / 2 - this.canvasOffset.x;
    let y = this.defaultPadding.y / 2 - this.canvasOffset.y;
    let leftArrow;
    let rightArrow;
    for (const [name, components] of Object.entries(EntityData)) {
      if (components.inLevelEditor && components[ComponentTypes.RENDERABLE]) {
        const renderC = new RenderableC(components[ComponentTypes.RENDERABLE]);
        const entity = this.entityManager.addEntity(`${name}Selector`);
        entity.addComponent(renderC);
        if (name === "LeftArrow") {
          leftArrow = entity;
        } else if (name === "RightArrow") {
          rightArrow = entity;
        } else {
          entities.push(entity);
        }
      }
    }
    let selector = {
      width,
      height,
      padding,
      entities,
      leftArrow,
      rightArrow,
      entitySize,
      x,
      y,
    };

    return selector;
  }
  updateCanvasOffset() {
    this.canvasOffset = Helper.getCanvasOffset();
  }
  drawGrid() {
    let startEndIndex = {
      x: Math.round(this.canvasOffset.x / this.gridSize) * -1 - 3,
      y: Math.round(this.canvasOffset.y / this.gridSize) * -1 - 3,
    };
    let width = Math.round(canvas.width / this.gridSize) + startEndIndex.x;
    let height = Math.round(canvas.height / this.gridSize) + startEndIndex.y;

    for (let x = startEndIndex.x; x <= width + 3; x++) {
      for (let y = startEndIndex.y; y <= height + 3; y++) {
        canvasContext.strokeStyle = "rgba(0,0,0,0.3)";
        canvasContext.beginPath();
        canvasContext.rect(
          x * this.gridSize,
          y * this.gridSize,
          this.gridSize,
          this.gridSize
        );
        canvasContext.stroke();
      }
    }
  }
  drawSelector() {
    let margin = 15;
    let canFit = Math.floor(this.selector.width / this.selector.entitySize);
    let entitySize = this.selector.entitySize;
    let remainingPadding =
      this.selector.width - canFit * this.selector.entitySize;
    for (let i = 0; i < canFit && i < this.selector.entities.length; i++) {
      const entity = this.selector.entities[i];
      const renderC = entity.components[ComponentTypes.RENDERABLE];
      let widthScale = entitySize / renderC.width;
      let heightScale = entitySize / renderC.height;
      let scale;
      let extraPadding;
      if (widthScale < heightScale) {
        scale = widthScale;
        extraPadding = {
          x: 0,
          y: entitySize - scale * renderC.height,
        };
      } else {
        scale = heightScale;
        extraPadding = {
          x: entitySize - scale * renderC.width,
          y: 0,
        };
      }
      renderC.scaledWidth = scale * renderC.width;
      renderC.scaledHeight = scale * renderC.height;
      renderC.posX =
        i * entitySize +
        this.defaultPadding.x / 2 +
        this.selector.padding.x / 2 +
        margin * i +
        remainingPadding / 2 -
        this.canvasOffset.x +
        extraPadding.x / 2;
      renderC.posY =
        this.defaultPadding.y / 2 +
        this.selector.padding.y / 2 -
        this.canvasOffset.y +
        extraPadding.y / 2;
    }
    canvasContext.beginPath();
    canvasContext.fillStyle = "rgba(0,0,0,0.3)";
    canvasContext.fillRect(
      this.selector.x - this.canvasOffset.x,
      this.selector.y - this.canvasOffset.y,
      this.selector.width,
      this.selector.height
    );
    canvasContext.stroke();
  }
  getEntityAtMouseClick() {
    const mousePosition = window.mouseTracker.getLocation(0);
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      const renderC = entity.components[ComponentTypes.RENDERABLE];
      if (renderC) {
        if (
          renderC.posX < mousePosition.x &&
          renderC.posX + renderC.scaledWidth > mousePosition.x &&
          renderC.posY < mousePosition.y &&
          renderC.posY + renderC.scaledHeight > mousePosition.y &&
          this.selectedEntity?.id !== entity.id
        ) {
          return entity;
        }
      }
    }
    return null;
  }
  isClickingSelector() {
    const mousePosition = window.mouseTracker.getLocation(0);
    return (
      this.selector.x - this.canvasOffset.x < mousePosition.x &&
      this.selector.x - this.canvasOffset.x + this.selector.width >
        mousePosition.x &&
      this.selector.y - this.canvasOffset.y < mousePosition.y &&
      this.selector.y - this.canvasOffset.y + this.selector.height >
        mousePosition.y
    );
  }

  getMouseGridPosition() {
    const mousePosition = window.mouseTracker.getLocation(0);
    return Helper.toGridPosition(mousePosition, this.gridSize);
  }
  updateSelectedEntityPosition() {
    const mousePosition = window.mouseTracker.getLocation(0);
    const renderC = this.selectedEntity.components[ComponentTypes.RENDERABLE];
    const gridPosition = Helper.toGridPosition(
      {
        x: mousePosition.x - renderC.scaledWidth / 2,
        y: mousePosition.y - renderC.scaledHeight / 2,
      },
      this.gridSize
    );

    renderC.posX = (gridPosition.x + 0) * this.gridSize;
    renderC.posY = (gridPosition.y + 0) * this.gridSize;
  }
  drawPauseScreen() {
    if (!this.pauseMenu.length > 0) {
      const pauseMenu = Helper.generateEntity("PauseMenu", this.entityManager);
      const pauseRenderC = pauseMenu.components[ComponentTypes.RENDERABLE];
      pauseRenderC.posX =
        canvas.width / 2 -
        Helper.getCanvasOffset().x -
        pauseRenderC.scaledWidth / 2;
      pauseRenderC.posY =
        canvas.height / 2 -
        Helper.getCanvasOffset().y -
        pauseRenderC.scaledHeight / 2;
      const continueItem = Helper.generateEntity(
        "ContinueMenuItem",
        this.entityManager
      );
      const exit = Helper.generateEntity("ExitMenuItem", this.entityManager);
      const continueRenderC =
        continueItem.components[ComponentTypes.RENDERABLE];
      const exitRenderC = exit.components[ComponentTypes.RENDERABLE];
      continueRenderC.posX =
        pauseRenderC.posX +
        pauseRenderC.scaledWidth / 2 -
        continueRenderC.scaledWidth / 2;
      continueRenderC.posY = pauseRenderC.posY + 220;
      exitRenderC.posX =
        pauseRenderC.posX +
        pauseRenderC.scaledWidth / 2 -
        exitRenderC.scaledWidth / 2;
      exitRenderC.posY = continueRenderC.posY + 80;
      this.pauseMenu.push(
        { entity: pauseMenu },
        {
          entity: exit,
          handler: () => {
            this.isActive = false;
            this.exit();
          },
        },
        { entity: continueItem, handler: this.togglePause }
      );
    }
  }
  checkForPauseMenuClicks(controllsC) {
    if (controllsC.mouseState.leftClick) {
      const lastMousePosition = window.mouseTracker.getLocation(0);
      for (const menuItem of this.pauseMenu) {
        const renderC = menuItem.entity.components[ComponentTypes.RENDERABLE];
        const isClicked =
          renderC.posX < lastMousePosition.x &&
          renderC.posX + renderC.scaledWidth > lastMousePosition.x &&
          renderC.posY < lastMousePosition.y &&
          renderC.posY + renderC.scaledHeight > lastMousePosition.y;
        if (isClicked && menuItem.handler !== undefined) menuItem.handler();
      }
    }
  }
  update(isPaused, currentPlanet, isActive) {
    this.isActive = isActive;
    this.updateCanvasOffset();
    this.drawSelector();
    this.updateFloor(currentPlanet);

    if (isPaused) {
      this.drawPauseScreen();
    } else {
      while (this.pauseMenu.length > 0) {
        const menuItem = this.pauseMenu.pop();
        menuItem.entity.remove();
      }
    }
    if (this.selectedEntity) this.updateSelectedEntityPosition();
    if (this.grid) this.drawGrid();
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      const controllsC = entity.components[ComponentTypes.CONTROLABLE];
      if (controllsC) {
        this.checkForPauseMenuClicks(controllsC);
        const leftClick = controllsC.mouseState.leftClick;
        const rightClick = controllsC.mouseState.rightClick;
        if (rightClick || leftClick) {
          const clickedAt = this.getEntityAtMouseClick();
          const clickedInSelector = this.isClickingSelector();
          if (clickedAt) {
            if (rightClick && !clickedInSelector) {
              clickedAt.remove();
            }
            if (leftClick) {
              if (clickedInSelector) {
                if (clickedAt.descriptor.includes("Selector")) {
                  if (this.selectedEntity) this.selectedEntity.remove();
                  this.selectedEntity = Helper.cloneEntity(
                    clickedAt,
                    this.entityManager
                  );
                }
                controllsC.mouseState.leftClick = false;
              }
            }
          } else {
            if (this.selectedEntity && leftClick && !clickedInSelector) {
              const entity = Helper.generateEntity(
                this.selectedEntity.descriptor.replace("Selector", ""),
                this.entityManager
              );
              const renderC = entity.components[ComponentTypes.RENDERABLE];
              const mousePosition = window.mouseTracker.getLocation(0);
              const gridPosition = Helper.toGridPosition(
                {
                  x: mousePosition.x - renderC.scaledWidth / 2,
                  y: mousePosition.y - renderC.scaledHeight / 2,
                },
                this.gridSize
              );
              renderC.posX = gridPosition.x * this.gridSize;
              renderC.posY = gridPosition.y * this.gridSize;
            }
          }
        }
      }
    }
  }
}
