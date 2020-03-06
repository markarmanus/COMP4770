gameState = function() {
    var self = {};
    let posx = 0
    let posy = 0

    self.update = function() {
        // this should call all the relevant systems in the gamestate
        movement();
        render();
        console.log("test");
    }

    function movement() {
        // This movement system should operate on entities with movement components
        // example: (simple movement for render example, this is not component based)

        posx++;
        posy++;
    }

    function render() {
        // this should render all relavent items of a state
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d"); 
        ctx.clearRect(0,0,1280,720); //clears screen

        // Use ctx to manipulate the canvas
        // example:
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(posx, posy, 150, 75);            
    }

    return self;
}