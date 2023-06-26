import { Container, Graphics } from "pixi.js";
import { distanceBot } from "./constants";

export class Ground extends Container{
    constructor(game){
        super();
        this.game=game;
        this.draw();
    }
    draw(){
        var tmp = new Graphics();
        tmp.beginFill(0x555555);
        tmp.drawRect(0,0,this.game.app.screen.width,distanceBot);
        tmp.endFill();
        this.addChild(tmp);
        this.position.set(0,this.game.app.screen.height-distanceBot);
        this.game.app.stage.addChild(this);
    }
}