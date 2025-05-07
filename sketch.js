let circleSize = 200;
let circleSeparation = 100;
let strokeWidth = 20;
let bgColor = '#ffffff';

let circleColors = ['#2143bd', '#00c2ff', '#00d079'];

let angle1 = 0;
let angle2 = 0;
let angle3 = 0;
let direction = 1;

let gui;
let params;

let textOverlay;
let showCopyright = true;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // 创建 2D 图层，用于绘制版权信息
  textOverlay = createGraphics(windowWidth, windowHeight);
  textOverlay.textSize(12);
  textOverlay.textAlign(RIGHT, BOTTOM);
  textOverlay.fill(0);
  textOverlay.noStroke();

  // dat.GUI 参数对象
  params = {
    CircleSize: 200,
    Separation: 100,
    StrokeWidth: 20,
    BackgroundColor: '#ffffff',
    Circle1Color: '#2143bd',
    Circle2Color: '#00c2ff',
    Circle3Color: '#00d079',
    SaveImage: function () {
      // 保存图像时隐藏版权
      copyright(false);
      // 延时确保文字被清除
      setTimeout(() => {
        saveCanvas('myDesign', 'png');
        // 恢复版权显示
        copyright(true);
      }, 200);
    }
  };

  gui = new dat.GUI();
  gui.add(params, 'CircleSize', 100, 800).onChange(v => circleSize = v);
  gui.add(params, 'Separation', 0, 200).onChange(v => circleSeparation = v);
  gui.add(params, 'StrokeWidth', 4, 36).onChange(v => strokeWidth = v);
  gui.addColor(params, 'BackgroundColor').onChange(v => bgColor = v);
  gui.addColor(params, 'Circle1Color').onChange(v => circleColors[0] = v);
  gui.addColor(params, 'Circle2Color').onChange(v => circleColors[1] = v);
  gui.addColor(params, 'Circle3Color').onChange(v => circleColors[2] = v);
  gui.add(params, 'SaveImage');
}

function draw() {
  background(bgColor);

  angle1 += 0.03 * direction;
  angle2 += 0.05 * direction;
  angle3 += 0.02 * direction;

  // 第一个圆环
  push();
  translate(-circleSeparation, 0, 0);
  rotateZ(frameCount * 0.05);
  rotateY(frameCount * 0.03);
  strokeWeight(strokeWidth);
  stroke(circleColors[0]);
  noFill();
  beginShape();
  for (let a = 0; a <= angle1; a += 0.05) {
    let x = cos(a) * (circleSize * 0.7 / 2);
    let y = sin(a) * (circleSize / 2);
    vertex(x, y);
  }
  endShape();
  pop();

  // 第二个圆环
  push();
  rotateY(frameCount * 0.05);
  rotateX(frameCount * 0.03);
  strokeWeight(strokeWidth);
  stroke(circleColors[1]);
  noFill();
  beginShape();
  for (let a = 0; a <= angle2; a += 0.05) {
    let x = cos(a) * (circleSize * 0.7 / 2);
    let y = sin(a) * (circleSize / 2);
    vertex(x, y);
  }
  endShape();
  pop();

  // 第三个圆环
  push();
  translate(circleSeparation, 0, 0);
  rotateX(frameCount * 0.05);
  rotateZ(frameCount * 0.03);
  strokeWeight(strokeWidth);
  stroke(circleColors[2]);
  noFill();
  beginShape();
  for (let a = 0; a <= angle3; a += 0.05) {
    let x = cos(a) * (circleSize / 2);
    let y = sin(a) * (circleSize * 0.7 / 2);
    vertex(x, y);
  }
  endShape();
  pop();

  // 旋转角度控制
  if (angle1 >= TWO_PI && angle2 >= TWO_PI && angle3 >= TWO_PI) {
    direction = -1;
  }
  if (angle1 <= 0 && angle2 <= 0 && angle3 <= 0) {
    direction = 1;
  }

  // 绘制版权信息
  if (showCopyright) {
    textOverlay.clear();
    textOverlay.text(
      "Created by @Zhijie-Yi @LuANyxxx\n©️ All my products are available for personal and commercial projects",
      textOverlay.width - 10,
      textOverlay.height - 10
    );
    resetMatrix(); // 重置坐标
    image(textOverlay, -width / 2, -height / 2);
  }
}

// 控制是否显示版权信息
function copyright(show) {
  showCopyright = show;
}
