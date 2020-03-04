gameEngine = function() {
    var self = {};

    let isRunning = true;
    let states = [];
    let toStates = [];
    let popCount = 0;

    self.init = function() {
        //this should start the canvas space
        //it should have the div passed over for where the canvas will exist
        //it should also load the first gamestate
        console.log("load init");
    }

    self.run = function() {console.log
        console.log("loop init");
        let t = setInterval(gameLoop,1000/60); //loop executed 60 times per second
        
        function gameLoop() {
            isRunning ? self.update() : clearInterval(t);
        }
    }

    self.update = function() {
        console.log("game loop");
        //this should handle the loading and unloading of gamestates and should call the gamestate.update()
        if(popCount > 0){
            for(i = 0; i < popCount; i++) states.pop();
        }

        if(toStates.length > 0){
            for(i = 0; i < toStates.length; i++) states.push(toStates[i])
        }

        if(states.length > 0){
            states[states.length-1].update();
        }
    }

    self.addState = function(){
        states.push()
    }

    self.popState = function(numOfStates){
        popCount = numOfStates;
    }

    self.quit = function() {
        isRunning = false;
    }

    return self;
}