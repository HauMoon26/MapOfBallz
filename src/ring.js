import { Container, Graphics} from "pixi.js";
import { widthSquare, heightSquare} from "./constants";
import { gsap } from "gsap";
import { calculatePosition } from "./constants";
export class Ring extends Container{
    constructor(game,row,col){
        super();
        this.game=game;
        this.row=row;
        this.col=col;
        this.draw();
    }
    draw(){ // vẽ item ring
        var tmp= new Graphics();
        tmp.lineStyle(4,0xfcd303);
        tmp.drawCircle(widthSquare/2,heightSquare/2,heightSquare*0.3);
        tmp.endFill();
        this.addChild(tmp);
        const {x,y}=calculatePosition(this.row,this.col);
        this.position.set(x,y); 
        this.game.app.stage.addChild(this);   
    }
    fall() { // rơi xuống 1 hàng
        const newY= calculatePosition(this.row+1,this.col).y;
        gsap.to(this.position,{
            y:newY,delay:0.4,duration:0.4,
            onComplete:()=>{
            this.row++}});
  }
}