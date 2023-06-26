import { Application, Ticker} from "pixi.js";
import { Ground } from "./ground";
import { Score } from "./score";
import { Map } from "./map";


export class Game {
    constructor() {
        this.app = new Application({
            width: 600,
            height: window.innerHeight,
            backgroundColor: 0x000000,  
        });
        document.body.appendChild(this.app.view);
        this.count =1; // đếm số hàng đã trôi qua
        var ground = new Ground(this); // vẽ nền đất
        var score = new Score(this); // vẽ thanh điểm 
        this.map =new Map(this); // tạo map 
        this.map.collectItem();
        this.map.fall();
        Ticker.shared.add(this.map.update,this.map); // cập nhật map liên tục
    }
}
window.onload = function () {
    new Game();
}
