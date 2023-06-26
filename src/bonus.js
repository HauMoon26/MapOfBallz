import { Container, Graphics } from "pixi.js";
import { gsap } from "gsap";
import { widthSquare, heightSquare } from "./constants";
import { calculatePosition } from "./constants";

export class Bonus extends Container {
  constructor(game, row, col) {
    super();
    this.game = game;
    this.row = row;
    this.col = col;
    this.radius2 = heightSquare * 0.3; // bán kính viền tròn ngoài ban đầu
    this.draw();
    this.animateRadius();
  }
  //tạo hiệu ứng cho viền tròn ngoài
  animateRadius() {
    const endRadius = heightSquare * 0.4; // bán kính viền tròn ngoài max
    gsap.to(this, {
      radius2: endRadius,
      duration: 0.4,
      yoyo: true,
      repeat: -1,
      repeatDelay: 0,
      onUpdate: () => {
        this.updateCircle2();
      },
    });
  }
  // vẽ hình tròn tĩnh bên trong
  drawCircle1() {
    const tmp = new Graphics();
    tmp.beginFill(0xffffff);
    tmp.drawCircle(widthSquare/ 2, heightSquare / 2, heightSquare * 0.2);
    tmp.endFill();
    this.addChild(tmp);
  }
  //vẽ viền tròn ngoài
  drawCircle2() {
    const tmp = new Graphics();
    tmp.lineStyle(4, 0xffffff);
    tmp.beginFill(0x000000);
    tmp.drawCircle(widthSquare / 2, heightSquare / 2, this.radius2);
    tmp.endFill();
    this.addChild(tmp);
    this.circle2 = tmp;
  }
  // vẽ item bonus
  draw() {
    this.drawCircle2();
    this.drawCircle1();
    const { x, y } = calculatePosition(this.row, this.col);
    this.position.set(x, y);
    this.game.app.stage.addChild(this);
  }
  //vẽ hiệu ứng 
  updateCircle2() {
      this.circle2.clear();
      this.circle2.lineStyle(4, 0xffffff);
      this.circle2.beginFill(0x000000);
      this.circle2.drawCircle(widthSquare / 2, heightSquare/ 2, this.radius2);
      this.circle2.endFill();
  }
  // rơi xuống 1 hàng
  fall() {
    const newY = calculatePosition(this.row + 1, this.col).y;
    gsap.to(this.position, {
      y: newY,delay:0.4,
      duration: 0.4,
      onComplete: () => {
        this.row++;
      },
    })
  }
}
