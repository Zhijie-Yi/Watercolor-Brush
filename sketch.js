let objs = [];
const noiseScale = 0.01;
let gui;
let settings = {
  minDiameter: 5,
  maxDiameter: 30,
  minLife: 20,
  maxLife: 50,
  step: 0.3,
  color1: "#ACDEED",
  color2: "#EAD5E8",
  color3: "#84C0E7",
  color4: "#384399",
  bgColor: "#F5F4FD",
  saveImage: function () {
    saveCanvas("particle_art", "png");
  },
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noStroke();
  background(settings.bgColor);

  gui = new dat.GUI();
  gui.add(settings, "minDiameter", 1, 30).name("最小半径");
  gui.add(settings, "maxDiameter", 10, 100).name("最大半径");
  gui.add(settings, "minLife", 5, 50).name("最小寿命");
  gui.add(settings, "maxLife", 10, 100).name("最大寿命");
  gui.add(settings, "step", 0.1, 1).step(0.05).name("生命周期步长");
  gui.addColor(settings, "color1").name("颜色1");
  gui.addColor(settings, "color2").name("颜色2");
  gui.addColor(settings, "color3").name("颜色3");
  gui.addColor(settings, "color4").name("颜色4");
  gui.addColor(settings, "bgColor").name("背景颜色").onChange(() => {
    background(settings.bgColor);
  });
  gui.add(settings, "saveImage").name("保存图像");
}

function draw() {
  if (mouseIsPressed) {
    let x = mouseX;
    let y = mouseY;
    objs.push(new Obj(x, y));
  }

  for (let i = 0; i < objs.length; i++) {
    objs[i].move();
    objs[i].display();
  }

  for (let j = objs.length - 1; j >= 0; j--) {
    if (objs[j].isFinished()) {
      objs.splice(j, 1);
    }
  }

  // 版权信息
  fill(0);
  noStroke();
  textSize(12);
  textAlign(RIGHT, BOTTOM);
  text(
    "Created by @Zhijie-Yi @LuANyxxx\n©️All my products are available for personal and commercial projects",
    width - 10,
    height - 10
  );
}

class Obj {
  constructor(ox, oy) {
    this.pos = createVector(ox, oy);
    this.vel = createVector(0, 0);
    this.t = random(0, noiseScale);
    this.lifeMax = random(settings.minLife, settings.maxLife);
    this.life = this.lifeMax;
    this.step = settings.step;
    this.dMax = random(settings.minDiameter, settings.maxDiameter);
    this.d = this.dMax;

    // 随机选择四种颜色中的一种
    let colorIndex = floor(random(4));
    if (colorIndex === 0) {
      this.c = color(settings.color1 + "88"); // 加透明度
    } else if (colorIndex === 1) {
      this.c = color(settings.color2 + "88"); // 加透明度
    } else if (colorIndex === 2) {
      this.c = color(settings.color3 + "88"); // 加透明度
    } else {
      this.c = color(settings.color4 + "88"); // 加透明度
    }
  }

  move() {
    let theta = map(noise(this.pos.x * noiseScale, this.pos.y * noiseScale, this.t), 0, 1, -360, 360);
    this.vel.x = cos(theta);
    this.vel.y = sin(theta);
    this.pos.add(this.vel);
  }

  isFinished() {
    this.life -= this.step;
    this.d = map(this.life, 0, this.lifeMax, 0, this.dMax);
    return this.life < 0;
  }

  display() {
    fill(this.c);
    circle(this.pos.x, this.pos.y, this.d);
  }
}
