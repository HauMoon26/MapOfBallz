import { numCol, numRow,_,b,r } from "./constants";
import { Square } from "./square";
import { Ring } from "./ring";
import { Bonus } from "./bonus";
import { Row } from "./row";

export class Map {
    constructor(game){
        this.game=game;
        this.data=[]; 
        // mảng lưu trữ các item trên map
        this.square=[]; 
        this.ring=[]; 
        this.bonus=[];
        this.createMap();
        this.createNewRowAndFill();
        this.fixed=false;
        this.startFixed();
    }
    createMap(){ // tạo mảng 2 chiều đánh dấu vị trí của item
        for(let i=0;i<numRow;i++){
            this.data[i]=[];
            for(let j=0;j<numCol;j++){
                this.data[i][j]=_;
            }
        }
    }
    createNewRowAndFill() {
        var newRow = new Row(this.game);
        for (let j = 0; j < numCol; j++) {
            this.data[0][j] = newRow.data[j];
        }
    }
    fallData() { // dữ liệu hàng trên chuyển xuống hàng dưới
      for (let i = numRow - 1; i > 0; i--) {
        for (let j = 0; j < numCol; j++) {
          this.data[i][j] = this.data[i - 1][j];
        }
      }
      this.createNewRowAndFill();
    }
    fall(){ // hiệu ứng map rơi 1 hàng
      for(let i=0;i<this.square.length;i++){
        this.square[i].fall();
      }
      for(let i=0;i<this.ring.length;i++){
        this.ring[i].fall();
      }
      for(let i=0;i<this.bonus.length;i++){
        this.bonus[i].fall();
      }
    }
    collectItem() { // mỗi khi hàng mới xuất hiện, thêm các item vào mảng của nó
      for (let j = 0; j < numCol; j++) {
        switch (this.data[0][j]) {
          case _:
            continue;
          case b:
            var bonus = new Bonus(this.game, 0, j);
            this.bonus.push(bonus);
            break;
          case r:
            var ring = new Ring(this.game, 0, j);
            this.ring.push(ring);
            break;
          default:
            var square = new Square(this.game, 0, j);
            this.square.push(square);
            break;
        }
      }
    }
    
    update(){ // cập nhật map mỗi khi bị cố định
      if(this.fixed){
        this.game.count++;
        this.fallData();
        this.collectItem();
        this.fall();
        this.fixed=false;
      }
    }
    startFixed() { // test cứ mỗi 2 giây thì map lại cố đinh 1 lần và sinh ra hàng mới
      setInterval(() => {
        this.fixed = true;
      }, 2000);
    }
}