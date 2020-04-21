import inGameState from "./States/InGame/InGameState";
import LevelEditorState from "./States/LevelEditor/LevelEditorState";
import Helper from "./Helper";
export default class GameEngine {
  constructor() {
    this.isRunning = true;
    this.states = [];
    this.newStates = [];
    this.popCount = 0;
    this.init();
  }

  init() {
    document.addEventListener("contextmenu", (event) => event.preventDefault());
    window.currentLevel = levels[0];
    this.newStates.push(new LevelEditorState(currentLevel, this));
  }

  run() {
    var self = this;
    const mainLoop = setInterval(gameLoop, 1000 / 60); //loop executed 60 times per second
    function gameLoop() {
      self.isRunning ? self.update() : clearInterval(mainLoop);
    }
  }

  update() {
    const { popCount, newStates, states } = this;
    //this should handle the loading and unloading of gamestates and should call the gamestate.update()
    for (let i = 0; i < popCount; i++) {
      states.pop();
    }
    for (let i = 0; i < newStates.length; i++) states.push(newStates[i]);
    this.newStates = [];
    this.popCount = 0;
    if (states.length) {
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      states[states.length - 1].update();
    }
  }

  addState(state) {
    this.newStates.push(state);
  }

  popState(numOfPops) {
    this.popCount = numOfPops;
  }

  quit() {
    this.isRunning = false;
  }
}
