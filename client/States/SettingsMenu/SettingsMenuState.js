import GameState from "./../../GameState";

export default class mainMenuState extends GameState {
    constructor(gameEngine) {
        super();
        this.gameEngine = gameEngine;
        this.selection = 0; 
        this.up = false;
        this.previous = false;
        this.enter = false;
        this.back = false;

        this.init();

        window.addEventListener("keydown", (e) =>{
            if (e.code === "KeyW") this.next = true;
            if (e.code === "KeyA") this.previous = true;
            if (e.code === "KeyS") this.previous = true;
            if (e.code === "KeyD") this.next = true;
            if (e.code === "KeyE") this.enter = true;
            if (e.code === "Enter") this.enter = true;
            if (e.code === "Escape") this.logout = true;

        });
        window.addEventListener("keyup", (e) =>{
            if (e.code === "KeyW") this.next = false;
            if (e.code === "KeyA") this.previous = false;
            if (e.code === "KeyS") this.previous = false;
            if (e.code === "KeyD") this.next = false;
            if (e.code === "KeyE") this.enter = false;
            if (e.code === "Enter") this.enter = false;
            if (e.code === "Escape") this.logout = false;

        });

        console.log("settings context menu");
    }

    update(){
        this.inputS();

    };

    init() {

    };

    inputS(){
        if(this.next) {
            this.selection++;
            if(this.selection>1) this.selection=0;
            this.next=false;
        }

        if(this.previous){             
            this.selection--;
            if(this.selection<0) this.selection=1;
            this.previous=false;
        }

        if(this.enter){
            if(this.selection === 0) ;// do something related to gui scale
            if(this.selection === 1) ;// do something related to password change 
        }

        if(this.back) this.gameEngine.popState(1);
    };
}