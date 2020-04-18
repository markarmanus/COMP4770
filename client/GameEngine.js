import inGameState from "./States/InGame/InGameState";
import mainMenuState from "./States/MainMenu/MainMenuState";
import levelSelectState from "./States/LevelSelect/LevelSelectState";
import levelEditorState from "./States/LevelEditor/LevelEditorState";


import Helper from "./States/InGame/Helper";
export default class GameEngine {
  constructor() {
    this.isRunning = true;
    this.states = [];
    this.newStates = [];
    this.popCount = 0;
    this.init();
  }

  init() {
    //window.currentLevel = levels[0];
    this.newStates.push(new mainMenuState(this));
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
      canvasContext.clearRect(0, 0, canvas.width, canvas.height); //this shouldnt be here, it should be apart of the rendering systems
      /*const background = new Image();
      background.src = "https://i.ytimg.com/vi/Ic3ZdD5ko7k/maxresdefault.jpg";
      const patern = canvasContext.createPattern(background, "repeat");
      canvasContext.fillStyle = patern;
      canvasContext.fillRect(
        canvas.width * 2 * -1,
        canvas.height * 2 * -1,
        canvas.width * 10,
        canvas.height * 10
      );*/
      states[states.length - 1].update();
    }
  }

  addState(state) {
    console.log(state);
    this.newStates.push(state);
  }

  popState(numOfPops) {
    this.popCount = numOfPops;
  }

  quit() {
    this.isRunning = false;
  }
}
