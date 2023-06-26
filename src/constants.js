
export const distanceTop = window.innerHeight / 12; // khoảng cách với lề trên, chỗ ghi điểm
export const distanceBot = window.innerHeight / 12 * 2; // khoảng cách với lề dưới
export const paddingWidth = 600 / 50; // phần đệm giữa các ô
export const paddingHeight = (window.innerHeight / 12) * 9 / 64;
export const widthSquare = paddingWidth * 6; // chiều dài của ô 
export const heightSquare = paddingHeight * 6; // chiều rộng của ô
export const numRow = 9;
export const numCol = 7;
export const _ = null; // đánh dấu ô trống
export const b= "b"; // đánh dấu ô bounus
export const r="r"; // đánh dấu ô có nhẫn
export function calculatePosition(row, col) { // hàm đặt vị trí cho item vào màn hình theo hàng và cột
    const x = paddingWidth * (col + 1) + col * widthSquare;
    const y = distanceTop + paddingHeight * (row + 1) + row * heightSquare;
    return { x, y };
}
export const scaleBonus= 1.25;
