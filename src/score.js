import { Container, Graphics } from "pixi.js";
import { distanceTop, heightSquare, widthSquare } from "./constants";

export class Score extends Container{
    constructor(game){
        super();
        this.game= game;
        this.pauseButton = new Container();
        this.draw();
    }
    draw(){
        this.drawBackGround();
        this.drawPasueButton();
        this.position.set(0,0);
        this.game.app.stage.addChild(this);
    }
    drawBackGround(){
        var tmp = new Graphics();
        tmp.beginFill(0x555555);
        tmp.drawRect(0,0,this.game.app.screen.width,distanceTop);
        tmp.endFill();
        this.addChild(tmp);
    }
    drawPasueButton(){
        var tmp1 = new Graphics();
        tmp1.beginFill(0xD3D3D3);
        tmp1.drawRect(widthSquare*0.4,heightSquare*0.3,widthSquare*0.2/3,heightSquare*0.4);
        tmp1.endFill();
        var tmp2 = new Graphics();
        tmp2.beginFill(0xD3D3D3);
        tmp2.drawRect(widthSquare*(0.4+0.4/3),heightSquare*0.3,widthSquare*0.2/3,heightSquare*0.4);
        tmp2.endFill();
        this.pauseButton.addChild(tmp1,tmp2);
        this.pauseButton.position.set(0,0);
        this.addChild(this.pauseButton);
    }
    drawBestScore(){
    }
}