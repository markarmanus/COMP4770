import GameState from "./../../GameState";
import levelSelectState from "./../LevelSelect/LevelSelectState";
import levelEditorState from "./../LevelEditor/LevelEditorState";
import logOutState from "./../LogOut/LogOutState";
import settingsMenuState from "./../SettingsMenu/SettingsMenuState";
import RenderS from "./../Systems/RenderS";
import LevelManager from "./LevelManager";

export default class mainMenuState extends GameState {
    constructor(gameEngine) {
        super();
        this.gameEngine = gameEngine;
        this.selection = 0; //0-2 worlds,3 level editor, 4 settings
        this.next = false;
        this.previous = false;
        this.enter = false;
        this.logout = false;
        this.active = true;

        this.levelManager = new LevelManager(this.entityManager);
        this.renderS = new RenderS(this.entityManager);

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

    }

    update(){
        if(this.active) console.log("mainmenu"),this.active=false;

        this.inputS();
        this.renderS.update();

    };

    init() {
        this.levelManager.loadLevel(levels[2]);
    };

    inputS(){
        if(this.next) {
            this.selection++;
            if(this.selection>4) this.selection=0;
            this.next=false;
        }

        if(this.previous){             
            this.selection--;
            if(this.selection<0) this.selection=4;
            this.previous=false;
        }

        if(this.enter){
            if(this.selection < 3)this.gameEngine.addState(new levelSelectState(this.selection,this.gameEngine)),this.active=true;
            if(this.selection === 3)this.gameEngine.addState(new levelEditorState(levels[this.selection],this.gameEngine)),this.active=true;
            if(this.selection === 4)this.gameEngine.addState(new settingsMenuState(this.gameEngine)),this.active=true;
        }

        if(this.logout) this.gameEngine.addState(new logOutState(this.gameEngine));
    };
}