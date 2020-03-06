loginState = function() {
    var self = {};

    self.update = function() {
        // this should call all the relevant systems in the gamestate
        console.log("login update");
        render();
    }

    function render() {
        // this should render all relavent items of a state
        let canvas = document.getElementById("canvas");
        let cDiv = document.getElementById("canvasDiv");
        
    }

    return self;
}