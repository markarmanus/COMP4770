import inGameState from "./States/InGame/InGameState";
import LevelEditorState from "./States/LevelEditor/LevelEditorState";
export default class GameEngine {
  constructor() {
    this.isRunning = true;
    this.states = [];
    this.newStates = [];
    this.popCount = 0;
    this.init();
  }

  init() {
    this.newStates.push(new inGameState(levels[0]));
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
    for (let i = 0; i < popCount; i++) states.pop();
    for (let i = 0; i < newStates.length; i++) states.push(newStates[i]);
    if (states.length) {
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      const background = new Image();
      background.src = "https://i.ytimg.com/vi/Ic3ZdD5ko7k/maxresdefault.jpg";
      const patern = canvasContext.createPattern(background, "repeat");
      canvasContext.fillStyle = patern;
      canvasContext.fillRect(
        canvas.width * 2 * -1,
        canvas.height * 2 * -1,
        canvas.width * 10,
        canvas.height * 10
      );
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
