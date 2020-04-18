import GameState from "../../GameState";

export default class logOutState extends GameState {
    constructor(gameEngine) {
        super();
        this.gameEngine = gameEngine;
        this.selection = 0;
        this.confirm = false;
        this.back = false

        this.init();

        window.addEventListener("keydown", (e) =>{
            if (e.code === "KeyE") this.confirm = true;
            if (e.code === "Enter") this.confirm = true;

        });
        window.addEventListener("keyup", (e) =>{
            if (e.code === "KeyE") this.confirm = false;
            if (e.code === "Enter") this.confirm = false;
        });

        console.log("logout context menu")
    }

    update(){
        this.inputS();
    }

    init() {

    };

    inputS(){
        if(this.confirm) window.location=document.getElementById('logout').href;
        
        if(this.back) this.gameEngine.popState(1);
    }
}