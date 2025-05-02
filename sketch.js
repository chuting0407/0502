let capture;
let graphics; // 用於儲存與視訊畫面大小相同的圖形

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  background('#fcd5ce'); // 設定背景顏色
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始影像

  // 建立與視訊畫面大小相同的圖形
  graphics = createGraphics(capture.width, capture.height);
  updateGraphics(); // 初始化 graphics 的內容
}

function draw() {
  background('#fcd5ce'); // 確保背景顏色一致
  let x = (width - graphics.width) / 2; // 計算 graphics 的水平居中位置
  let y = (height - graphics.height) / 2; // 計算 graphics 的垂直居中位置

  // 顯示 graphics 在視窗正中間
  image(graphics, x, y); // 將 graphics 顯示在視窗正中間

  push(); // 儲存當前繪圖狀態
  translate(width, 0); // 將原點移到畫布右上角
  scale(-1, 1); // 水平翻轉畫布
  //image(capture, x, y, capture.width, capture.height); // 在畫布中央顯示翻轉後的影像
  pop(); // 恢復繪圖狀態
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布大小
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 調整影像大小
  graphics = createGraphics(capture.width, capture.height); // 重新建立與視訊畫面大小相同的圖形
  updateGraphics(); // 更新 graphics 的內容
}

function updateGraphics() {
  graphics.background(0); // 設定背景為黑色
  for (let i = 0; i < graphics.width; i += 20) {
    for (let j = 0; j < graphics.height; j += 20) {
      let col = capture.get(i, j); // 從 capture 中取得相對應位置的顏色

      // 繪製方框
      graphics.fill(col); // 設定方框顏色為 capture 的顏色
      graphics.noStroke(); // 移除邊框
      graphics.rect(i + 1, j + 1, 18, 18); // 繪製寬高為 18 的方框

      // 繪製圓形
      graphics.fill('#3a86ff'); // 設定圓形顏色為固定的藍色
      graphics.ellipse(i + 10, j + 10, 5, 5); // 在方框中心繪製直徑為 5 的圓形
    }
  }
}
