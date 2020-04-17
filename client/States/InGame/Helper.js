import ComponentClasses from "./Configuration/ComponentClasses";
import EntityData from "../../Configuration/EntityData";
import ComponentTypes from "../../ComponentTypes";
import EntityManager from "../../EntityManager";
import LevelManager from "./LevelManager";
const isDiagonalMove = (action) => {
  return (
    (action.x === 1 && action.y === 1) ||
    (action.x === -1 && action.y === -1) ||
    (action.x === 1 && action.y === -1) ||
    (action.x === -1 && action.y === 1)
  );
};
const addToOpen = (nodeToAdd, open) => {
  let added = false;
  // check if its already in the open list.
  for (let index = 0; index < open.length; index++) {
    let node = open[index];
    if (
      nodeToAdd.x === node.x &&
      nodeToAdd.y === node.y &&
      nodeToAdd.g >= node.g
    ) {
      added = true;
      break;
    }
  }
  // if its not already in the open list add where it belongs based on the f value.
  if (!added) {
    const nodeToAddF = nodeToAdd.g + nodeToAdd.h;
    // keep going until the f value is more than or equal to the one in the open list and that where you add the node.
    for (let index = 0; index < open.length; index++) {
      const node = open[index];
      const nodeF = node.g + node.h;
      if (nodeToAddF >= nodeF) {
        added = true;
        open.splice(index, 0, nodeToAdd);
        break;
      }
    }
  }
  // if was not added because it the smallest f then add it to the end..
  if (!added) {
    open.push(nodeToAdd);
  }
};
const isValidPosition = (position, width, height) => {
  return (
    position.x > 0 &&
    position.x < width &&
    position.y > 0 &&
    position.y < height
  );
};
export default class Helper {
  static profilerStart() {
    this.timer = new Date().getTime();
  }
  static profilerStop(name) {
    let timePassed = new Date().getTime() - this.timer;
    console.log(name + " Took " + timePassed.toString());
  }
  static generateEntity(type, entityManger) {
    const entityInstance = entityManger.addEntity(type);
    const components = Object.entries(EntityData[type]);
    for (let [component, properties] of components) {
      const componentInstance = new ComponentClasses[component](properties);
      entityInstance.addComponent(componentInstance);
    }
    return entityInstance;
  }
  static toOriginalPosition(position) {
    let canvasOffset = this.getCanvasOffset();
    return { x: position.x - canvasOffset.x, y: position.y - canvasOffset.y };
  }
  static toCameraPos(position) {
    let canvasOffset = this.getCanvasOffset();
    return { x: position.x + canvasOffset.x, y: position.y + canvasOffset.y };
  }
  static toPixelPosition(position) {
    return {
      x: position.x * 32 + 16,
      y: position.y * 32 + 16,
    };
  }
  static toGridPosition(position) {
    return {
      x: Math.floor(position.x / 32),
      y: Math.floor(position.y / 32),
    };
  }
  static getDistance(from, to) {
    let dx = to.x - from.x;
    let dy = to.y - from.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
  }
  static getCanvasOffset() {
    let canvasTransform = canvasContext.getTransform();
    let canvasOffset = {
      x: canvasTransform.e,
      y: canvasTransform.f,
    };
    return canvasOffset;
  }
  static getInitialLevelGrid() {
    return this.initialLevelEntityGrid;
  }
  static setInitialLevelGrid(entityManager) {
    let gridWidth = 0;
    let gridHeight = 0;
    const entities = entityManager.getNewEntities();

    for (const entity of entities) {
      const renderC = entity.components[ComponentTypes.RENDERABLE];
      if (renderC) {
        let gridPosition = this.toGridPosition({
          x: renderC.posX,
          y: renderC.posY,
        });
        gridHeight = gridPosition.y > gridHeight ? gridPosition.y : gridHeight;
        gridWidth = gridPosition.x > gridWidth ? gridPosition.x : gridWidth;
      }
    }
    this.initialLevelEntityGrid = this.entitiesToGrid(
      entities,
      gridWidth,
      gridHeight
    );
  }
  static entitiesToGrid(entities, gridWidth, gridHeight) {
    let canvasOffset = this.getCanvasOffset();
    const grid = [...new Array(gridHeight)].map(() =>
      [...new Array(gridWidth)].map(() => [])
    );
    for (const entity of entities) {
      const renderC = entity.components[ComponentTypes.RENDERABLE];
      if (renderC) {
        let x = Math.floor((renderC.posX + canvasOffset.x) / 32);
        let y = Math.floor((renderC.posY + canvasOffset.y) / 32);
        x = x < 0 ? 0 : x >= gridWidth ? gridWidth - 1 : x;
        y = y < 0 ? 0 : y >= gridHeight ? gridHeight - 1 : y;
        grid[y][x].push(entity.descriptor);
      }
    }
    return grid;
  }
  static getCurrentEntityGrid(entityManager) {
    let gridWidth = Math.floor(canvas.width / 32);
    let gridHeight = Math.floor(canvas.height / 32);
    const entities = entityManager.getEntities();
    return this.entitiesToGrid(entities, gridWidth, gridHeight);
  }

  static AStar(start, goal, entityManager, buffer) {
    start.h = this.getDistance(start, goal);
    start.g = 0;
    start.path = [];
    let grid = this.getCurrentEntityGrid(entityManager);
    let gridWidth = grid[0].length;
    let gridHeight = grid.length;
    let open = [];
    let closed = new Array(gridWidth * gridHeight).fill(false);
    open.push(start);
    let actions = [
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 1 },
      { x: -1, y: -1 },
      { x: 1, y: -1 },
      { x: -1, y: 1 },
    ];
    while (true) {
      if (open.length === 0) {
        return [];
      }
      let node = open.pop();
      if (node.x === goal.x && node.y === goal.y) {
        if (node.path.length > 1) {
          let prevAction = {
            x: node.path[1].x - node.path[0].x,
            y: node.path[1].y - node.path[0].y,
          };
          for (let i = 1; i < node.path.length - 1; i++) {
            let currentAction = {
              x: node.path[i + 1].x - node.path[i].x,
              y: node.path[i + 1].y - node.path[i].y,
            };
            if (
              prevAction.x === currentAction.x &&
              prevAction.y === currentAction.y
            ) {
              node.path[i] = undefined;
            } else {
              prevAction = currentAction;
            }
          }
          node.path = node.path.filter((node) => node);
        }
        node.path.shift();
        return node.path;
      }
      let index = node.y * gridWidth + node.x;
      if (closed[index]) continue;
      closed[index] = true;
      actions.forEach((action) => {
        const newNode = {
          x: node.x + action.x,
          y: node.y + action.y,
        };
        let isValid =
          isValidPosition(newNode, gridWidth, gridHeight) &&
          !grid[newNode.y][newNode.x].includes("Floor");
        if (buffer) {
          inner: for (let i = 0; i < actions.length; i++) {
            let action = actions[i];
            let position = {
              x: newNode.x + action.x,
              y: newNode.y + action.y,
            };
            if (
              isValidPosition(position, gridWidth, gridHeight) &&
              grid[position.y][position.x].includes("Floor")
            ) {
              isValid = false;
              break inner;
            }
          }
        }
        if (isValid) {
          newNode.h = this.getDistance(newNode, goal);
          newNode.g = isDiagonalMove(action) ? node.g + 2 : node.g + 1.5;
          newNode.path = [...node.path, { x: node.x, y: node.y }];
          addToOpen(newNode, open);
        }
      });
    }
  }
}
