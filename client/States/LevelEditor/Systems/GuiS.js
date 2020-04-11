import ComponentTypes from "../../../ComponentTypes";
import Images from "../../../Assets/ImageGenerator";
import EntityData from "../../../Configuration/EntityData";
import RenderableC from "../../Components/RenderableC";

export default class GuiS {
  constructor() {
    this.grid = true;
    window.addEventListener("keydown", (e) => {
      if (e.key === "C") {
        this.grid = !this.grid;
      }
    });
    this.defaultPadding = {
      x: 20,
      y: 20,
    };
    this.canvasOffset = {};
    this.selector = this.initalizeSelector();
  }
  initalizeSelector() {
    let width = 500;
    let height = canvas.height - this.defaultPadding.y;
    let selector = {
      width,
      height,
      padding: {
        x: 10,
        y: 10,
      },
      types: ["Player", "Floor"],
      entities: {},
    };
    return selector;
  }
  updateCanvasOffset() {
    const canvasTransform = canvasContext.getTransform();
    this.canvasOffset = {
      x: canvasTransform.e,
      y: canvasTransform.f,
    };
  }
  drawGrid() {
    let startEndIndex = {
      x: Math.round(this.canvasOffset.x / 32) * -1,
      y: Math.round(this.canvasOffset.y / 32) * -1,
    };
    let width = Math.round(canvas.width / 32) + startEndIndex.x;
    let height = Math.round(canvas.height / 32) + startEndIndex.y;

    for (let x = startEndIndex.x; x < width; x++) {
      for (let y = startEndIndex.y; y < height; y++) {
        canvasContext.beginPath();
        canvasContext.rect(x * 32, y * 32, 32, 32);
        canvasContext.stroke();
      }
    }
  }
  drawSelector(entityManager) {
    this.selector.x =
      canvas.width -
      this.selector.width -
      this.defaultPadding.x / 2 -
      this.canvasOffset.x;
    this.selector.y = this.defaultPadding.y / 2 - this.canvasOffset.y;
    canvasContext.fillStyle = "rgba(0,0,0,0.5)";
    canvasContext.fillRect(
      this.selector.x,
      this.selector.y,
      this.selector.width,
      this.selector.height
    );
    let perRow = 1;
    let counter = 0;
    let margin = 10;

    for (let i = 0; i < this.selector.types.length; i++) {
      const type = this.selector.types[i];
      const entityData = EntityData[type];
      if (entityData[ComponentTypes.RENDERABLE]) {
        let indexInRow = i % perRow;
        let inedxCol = Math.round(i / perRow);
        if (!this.selector.entities[type]) {
          let renderProps = entityData[ComponentTypes.RENDERABLE];
          const entity = entityManager.addEntity("SelectorEntity");
          this.selector.entities[type] = entity;
          counter++;
          entity.addComponent(new RenderableC(renderProps));

          //KARL ADD HERE CLICKABLE COMPONENT.
        } else {
          let renderC = this.selector.entities[type].components[
            ComponentTypes.RENDERABLE
          ];
          renderC.posX =
            this.selector.x +
            this.selector.padding.x +
            100 * indexInRow +
            margin;
          renderC.posY = this.selector.y + 200 * inedxCol;
        }
      }
    }
  }
  update(entityManager) {
    if (this.grid) this.drawGrid();
    this.updateCanvasOffset();
    this.drawSelector(entityManager);
    const entities = entityManager.getEntities();
    for (const entity of entities) {
      if (entity.describtor === "LevelEditor") {
      }
    }
  }
}
