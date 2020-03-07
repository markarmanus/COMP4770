class GameEngine {
  constructor() {
    this.isRunning = true;
    this.states = [];
    this.newStates = [];
    this.popCount = 0;
    this.init();
  }

  init() {
    //example of sending a event to the server
    socket.emit("eventHappened", { eventData: "Event Data can be here" });
    this.newStates.push(new GameState());
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
