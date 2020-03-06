gameEngine = function() {
    var self = {};
    let isRunning = true;
    let states = [];
    let newStates = [];
    let popCount = 0;

    init();

    function init() {
        //this should start the canvas space
        //it should have the div passed over for where the canvas will exist
        //it should also load the first gamestate
        console.log("load init");

        createCanvas();
        newStates.push(new gameState())
    }

    self.run = function() {
        console.log("loop init");

        let t = setInterval(gameLoop,1000/60); //loop executed 60 times per second
        function gameLoop() {
            isRunning ? update() : clearInterval(t);
        }
    }

    function update() {
        console.log("game loop");
        
        //this should handle the loading and unloading of gamestates and should call the gamestate.update()
        if(popCount > 0){
            for(i = 0; i < popCount; i++) states.pop();
        }

        if(newStates.length > 0) {
            for(i = 0; i < newStates.length; i++) states.push(newStates[i])
        }

        if(states.length > 0) {
            states[states.length-1].update();
        }
    }

    self.addState = function(state) {
        newStates.push(state);
    }

    self.popState = function(numOfPops) {
        popCount = numOfPops;s
    }

    self.quit = function() {
        isRunning = false;
    }

    function createCanvas() {
        let canvas = document.createElement("canvas");
        let canvasDiv = document.getElementById("canvasDiv")
        canvas.style.position = 'absolute';
        canvas.id = "canvas";
        canvas.style.left = 0;
        canvas.style.top = 0;
        canvas.width = 1280;
        canvas.height = 720;
        canvasDiv.appendChild(canvas);
    }

    return self;
}