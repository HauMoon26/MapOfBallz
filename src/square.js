import { Container, Sprite, Text} from "pixi.js";
import { widthSquare, heightSquare,numRow } from "./constants";
import { calculatePosition } from "./constants";
import { gsap } from "gsap";
export class Square extends Container {
    constructor(game,row ,col) {
        super();
        this.game = game;
        this.row = row;
        this.col = col;
        this.value=this.game.map.data[row][col];
        this.draw();
    }
    drawRect() { // vẽ hình vuông và đổ màu ứng với số điểm
        const tmp =Sprite.from("assets/images/square.png"); 
        tmp.anchor.set(0.5,0.5);
        tmp.tint= "0x"+ changeColor(this.value);
        tmp.width=widthSquare;
        tmp.height=heightSquare;
        tmp.position.set(widthSquare/2,heightSquare/2);
        this.addChild(tmp);
    }
    drawValue() { // vẽ điểm dựa trên dữ liệu ở mảng 2 chiều trong map
        const tmp = new Text((this.value), {
            fontFamily: "Arial",
            fontSize: 30,
            fill: 0x000000,
            align: "center"
        });
        tmp.anchor.set(0.5);
        tmp.position.set(widthSquare/2,heightSquare/2);
        this.addChild(tmp);
    }
    draw(){ // vẽ item hoàn chỉnh
        this.drawRect();
        this.drawValue();
        const {x,y}= calculatePosition(this.row,this.col);
        this.position.set(x,y);
        this.game.app.stage.addChild(this);
    }
    fall() { // rơi xuống 1 hàng
        const newY= calculatePosition(this.row+1,this.col).y;
        gsap.to(this.position,{
        y:newY,delay:0.4,duration:0.4,
        onComplete:()=>{
            if(this.row==numRow-1){ // sau khi hoàn thành rơi xuống, kiểm tra xem nó chạm đất chưa, nếu chạm rồi thì hủy màn hình
                this.game.app.stage.destroy();
            }
        }});
        this.row++; // sau khi rơi xuong thì chỉ số hàng + 
    }
        
}

function changeColor(score){// hàm đổi màu theo điểm
    var baseColor = "f29305";
    var tmp = parseInt(baseColor,16);
    tmp+=(score-1)*2048;
    var res= tmp.toString(16);
    return res;
}
