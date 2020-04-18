import GameState from "./../../GameState";
import inGameState from "./../InGame/InGameState";

export default class levelSelectState extends GameState {
    constructor(planentSelection,gameEngine) {
        super();
        this.gameEngine = gameEngine;
        this.selection = 0;
        this.next = false;
        this.previous = false;
        this.confirm = false;
        this.back = false
        this.planet = planentSelection;

        this.init(this.planet);

        window.addEventListener("keydown", (e) =>{
            if (e.code === "KeyW") this.next = true;
            if (e.code === "KeyA") this.previous = true;
            if (e.code === "KeyS") this.previous = true;
            if (e.code === "KeyD") this.next = true;
            if (e.code === "KeyE") this.confirm = true;
            if (e.code === "Enter") this.confirm = true;
            if (e.code === "Escape") this.back = true;
            if (e.code === "Backspace") this.back = true;


        });
        window.addEventListener("keyup", (e) =>{
            if (e.code === "KeyW") this.next = false;
            if (e.code === "KeyA") this.previosu = false;
            if (e.code === "KeyS") this.previous = false;
            if (e.code === "KeyD") this.next = false;
            if (e.code === "KeyE") this.confirm = false;
            if (e.code === "Enter") this.confirm = false;
            if (e.code === "Escape") this.back = false;
            if (e.code === "Backspace") this.back = false;
        });

        console.log("level selection");
    }

    update(){
        this.inputS();
    }

    init(p) {
        //load appropriate planet with levels
        if(p===0){}
        if(p===1){}
        if(p===2){}

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

        if(this.confirm) this.gameEngine.addState(new inGameState(levels[0],this.gameEngine));
        
        if(this.back) this.gameEngine.popState(1);
    }
}