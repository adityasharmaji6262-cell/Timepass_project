// Updated: Sound button removed from page
const qs = document.querySelector.bind(document);
const easingHeart = mojs.easing.path(
"M0,100C2.9,86.7,33.6-7.3,46-7.3s15.2,22.7,26,22.7S89,0,100,0");


const el = {
  container: qs(".mo-container"),

  i: qs(".lttr--I"),
  l: qs(".lttr--L"),
  o: qs(".lttr--O"),
  v: qs(".lttr--V"),
  e: qs(".lttr--E"),
  y: qs(".lttr--Y"),
  o2: qs(".lttr--O2"),
  u: qs(".lttr--U"),

  lineLeft: qs(".line--left"),
  lineRight: qs(".line--rght"),

  colTxt: "#ff5e7e",
  colHeart: "#fa4843",

  blup: qs(".blup"),
  blop: qs(".blop") };


class Heart extends mojs.CustomShape {
  getShape() {
    return '<path d="M50,88.9C25.5,78.2,0.5,54.4,3.8,31.1S41.3,1.8,50,29.9c8.7-28.2,42.8-22.2,46.2,1.2S74.5,78.2,50,88.9z"/>';
  }
  getLength() {
    return 200;
  }}

mojs.addShape("heart", Heart);

const crtBoom = (delay = 0, x = 0, rd = 46) => {
  parent = el.container;
  const crcl = new mojs.Shape({
    shape: "circle",
    fill: "none",
    stroke: el.colTxt,
    strokeWidth: { 5: 0 },
    radius: { [rd]: [rd + 20] },
    easing: "quint.out",
    duration: 500 / 3,
    parent,
    delay,
    x });


  const brst = new mojs.Burst({
    radius: { [rd + 15]: 110 },
    angle: "rand(60, 180)",
    count: 3,
    timeline: { delay },
    parent,
    x,
    children: {
      radius: [5, 3, 7],
      fill: el.colTxt,
      scale: { 1: 0, easing: "quad.in" },
      pathScale: [0.8, null],
      degreeShift: ["rand(13, 60)", null],
      duration: 1000 / 3,
      easing: "quint.out" } });



  return [crcl, brst];
};

const crtLoveTl = () => {
  const move = 1000;
  const boom = 200;
  const easing = "sin.inOut";
  const easingBoom = "sin.in";
  const easingOut = "sin.out";
  const opts = { duration: move, easing, opacity: 1 };
  const delta = 150;

  return new mojs.Timeline().add([
  new mojs.Tween({
    duration: move,
    onStart: () => {
      [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach(el => {
        el.style.opacity = 1;
        el.style =
        "transform: translate(0px, 0px) rotate(0deg) skew(0deg, 0deg) scale(1, 1); opacity: 1;";
      });
    },
    onComplete: () => {
      [el.l, el.o, el.v, el.e].forEach(el => el.style.opacity = 0);
      el.blop.play();
    } }),


  new mojs.Tween({
    duration: move * 2 + boom,
    onComplete: () => {
      [el.y, el.o2].forEach(el => el.style.opacity = 0);
      el.blop.play();
    } }),


  new mojs.Tween({
    duration: move * 3 + boom * 2 - delta,
    onComplete: () => {
      el.i.style.opacity = 0;
      el.blop.play();
    } }),


  new mojs.Tween({
    duration: move * 3 + boom * 2,
    onComplete: () => {
      el.u.style.opacity = 0;
      el.blup.play();
    } }),


  new mojs.Tween({
    duration: 50,
    delay: 4050,
    onUpdate: progress => {
      [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach(el => {
        el.style = `transform: translate(0px, 0px) rotate(0deg) skew(0deg, 0deg) scale(1, 1); opacity: ${
        1 * progress
        };`;
      });
    },
    onComplete: () => {
      [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach(el => {
        el.style.opacity = 1;
        el.style =
        "transform: translate(0px, 0px) rotate(0deg) skew(0deg, 0deg) scale(1, 1); opacity: 1;";
      });
    } }),


  new mojs.Html({
    ...opts,
    el: el.lineLeft,
    x: { 0: 52 } }).

  then({
    duration: boom + move,
    easing,
    x: { to: 52 + 54 } }).

  then({
    duration: boom + move,
    easing,
    x: { to: 52 + 54 + 60 } }).

  then({
    duration: 150, // 3550
    easing,
    x: { to: 52 + 54 + 60 + 10 } }).

  then({
    duration: 300 }).

  then({
    duration: 350,
    x: { to: 0 },
    easing: easingOut }),


  new mojs.Html({
    ...opts,
    el: el.lineRight,
    x: { 0: -52 } }).

  then({
    duration: boom + move,
    easing,
    x: { to: -52 - 54 } }).

  then({
    duration: boom + move,
    easing,
    x: { to: -52 - 54 - 60 } }).

  then({
    duration: 150,
    easing,
    x: { to: -52 - 54 - 60 - 10 } }).

  then({
    duration: 300 }).

  then({
    duration: 350,
    x: { to: 0 },
    easing: easingOut }),


  new mojs.Html({
    // [I] LOVE YOU
    ...opts,
    el: el.i,
    x: { 0: 34 } }).

  then({
    duration: boom,
    easing: easingBoom,
    x: { to: 34 + 19 } }).

  then({
    duration: move,
    easing,
    x: { to: 34 + 19 + 40 } }).

  then({
    duration: boom,
    easing: easingBoom,
    x: { to: 34 + 19 + 40 + 30 } }).

  then({
    duration: move,
    easing,
    x: { to: 34 + 19 + 40 + 30 + 30 } }),


  new mojs.Html({
    // I [L]OVE YOU
    ...opts,
    el: el.l,
    x: { 0: 15 } }),


  new mojs.Html({
    // I L[O]VE YOU
    ...opts,
    el: el.o,
    x: { 0: 11 } }),


  new mojs.Html({
    // I LO[V]E YOU
    ...opts,
    el: el.v,
    x: { 0: 3 } }),


  new mojs.Html({
    // I LOV[E] YOU
    ...opts,
    el: el.e,
    x: { 0: -3 } }),


  new mojs.Html({
    // I LOVE [Y]OU
    ...opts,
    el: el.y,
    x: { 0: -20 } }).

  then({
    duration: boom,
    easing: easingBoom,
    x: { to: -20 - 33 } }).

  then({
    duration: move,
    easing,
    x: { to: -20 - 33 - 24 } }),


  new mojs.Html({
    // I LOVE Y[O]U
    ...opts,
    el: el.o2,
    x: { 0: -27 } }).

  then({
    duration: boom,
    easing: easingBoom,
    x: { to: -27 - 27 } }).

  then({
    duration: move,
    easing,
    x: { to: -27 - 27 - 30 } }),


  new mojs.Html({
    // I LOVE YO[U]
    ...opts,
    el: el.u,
    x: { 0: -32 } }).

  then({
    duration: boom,
    easing: easingBoom,
    x: { to: -32 - 21 } }).

  then({
    duration: move,
    easing,
    x: { to: -32 - 21 - 36 } }).

  then({
    duration: boom,
    easing: easingBoom,
    x: { to: -32 - 21 - 36 - 31 } }).

  then({
    duration: move,
    easing,
    x: { to: -32 - 21 - 36 - 31 - 27 } }),


  new mojs.Shape({
    parent: el.container,
    shape: "heart",
    delay: move,
    fill: el.colHeart,
    x: -64,
    scale: { 0: 0.95, easing: easingHeart },
    duration: 500 }).

  then({
    x: { to: -62, easing },
    scale: { to: 0.65, easing },
    duration: boom + move - 500 }).

  then({
    duration: boom - 50,
    x: { to: -62 + 48 },
    scale: { to: 0.9 },
    easing: easingBoom }).

  then({
    duration: 125,
    scale: { to: 0.8 },
    easing: easingOut }).

  then({
    duration: 125,
    scale: { to: 0.85 },
    easing: easingOut }).

  then({
    duration: move - 200,
    scale: { to: 0.45 },
    easing }).

  then({
    delay: -75,
    duration: 150,
    x: { to: 0 },
    scale: { to: 0.9 },
    easing: easingBoom }).

  then({
    duration: 125,
    scale: { to: 0.8 },
    easing: easingOut }).

  then({
    duration: 125, // 3725
    scale: { to: 0.85 },
    easing: easingOut }).

  then({
    duration: 125 // 3850
  }).
  then({
    duration: 350,
    scale: { to: 0 },
    easing: easingOut }),


  ...crtBoom(move, -64, 46),
  ...crtBoom(move * 2 + boom, 18, 34),
  ...crtBoom(move * 3 + boom * 2 - delta, -64, 34),
  ...crtBoom(move * 3 + boom * 2, 45, 34)]);

};

const loveTl = crtLoveTl().play();
setInterval(() => {
  loveTl.replay();
}, 4300);

const volume = 0.2;
el.blup.volume = volume;
el.blop.volume = volume;

const toggleSound = () => {
  let on = true;
  return () => {
    if (on) {
      el.blup.volume = 0.0;
      el.blop.volume = 0.0;
    } else {
      el.blup.volume = volume;
      el.blop.volume = volume;
    }
    on = !on;
  };
};

/* --- Floating Hearts Canvas Particles --- */
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

class RomanticParticle {
  constructor(prePopulate = false) {
    this.reset(prePopulate);
  }

  reset(prePopulate = false) {
    this.type = Math.random() > 0.4 ? "star" : "heart"; // 60% stars, 40% hearts
    this.x = Math.random() * width;
    this.y = prePopulate ? Math.random() * height : height + Math.random() * 100;
    this.size = this.type === "heart" ? Math.random() * 8 + 5 : Math.random() * 2 + 1;
    this.speedY = this.type === "heart" ? Math.random() * 0.6 + 0.3 : Math.random() * 0.4 + 0.2;
    this.speedX = Math.random() * 0.3 - 0.15;
    this.baseOpacity = this.type === "heart" ? Math.random() * 0.35 + 0.15 : Math.random() * 0.5 + 0.25;
    this.opacity = this.baseOpacity;
    this.swing = Math.random() * 2 * Math.PI;
    this.swingSpeed = Math.random() * 0.02 + 0.005;
    
    // Rotation variables for hearts
    this.angle = Math.random() * 2 * Math.PI;
    this.rotSpeed = Math.random() * 0.01 - 0.005;
    
    // Twinkling phase for star sparks
    this.twinklePhase = Math.random() * 2 * Math.PI;
    this.twinkleSpeed = Math.random() * 0.04 + 0.015;

    const colors = ["rgba(255, 94, 126, ", "rgba(250, 72, 67, ", "rgba(255, 183, 197, ", "rgba(255, 241, 242, "];
    this.colorBase = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.y -= this.speedY;
    this.x += this.speedX + Math.sin(this.swing) * 0.3;
    this.swing += this.swingSpeed;

    if (this.type === "heart") {
      this.angle += this.rotSpeed;
    } else {
      this.twinklePhase += this.twinkleSpeed;
      // Twinkle opacity fluctuations
      this.opacity = Math.max(0.08, this.baseOpacity + Math.sin(this.twinklePhase) * 0.18);
    }

    if (this.y < -30 || this.x < -30 || this.x > width + 30) {
      this.reset(false);
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(this.x, this.y);

    if (this.type === "heart") {
      ctx.rotate(this.angle);
      ctx.fillStyle = this.colorBase + "1)";
      
      // Draw heart path
      ctx.beginPath();
      const size = this.size;
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-size / 2, -size / 2, -size, -size / 6, -size, size / 3);
      ctx.bezierCurveTo(-size, size, -size / 6, size * 1.5, 0, size * 2);
      ctx.bezierCurveTo(size / 6, size * 1.5, size, size, size, size / 3);
      ctx.bezierCurveTo(size, -size / 6, size / 2, -size / 2, 0, 0);
      ctx.closePath();
      ctx.fill();
    } else {
      // Draw glowing circular star / fairy dust spark
      const size = this.size;
      const glowRadius = size * 3;
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, glowRadius);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.25, this.colorBase + "0.85)");
      grad.addColorStop(1, this.colorBase + "0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, glowRadius, 0, 2 * Math.PI);
      ctx.fill();
    }

    ctx.restore();
  }
}

const particles = [];
const particleCount = 60;
for (let i = 0; i < particleCount; i++) {
  particles.push(new RomanticParticle(true));
}

/* --- Tracking Mouse Coordinates for Constellations --- */
const mouse = { x: null, y: null, active: false };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.active = true;
});

window.addEventListener("mouseleave", () => {
  mouse.active = false;
});

window.addEventListener("touchstart", (e) => {
  mouse.active = true;
  if (e.touches.length > 0) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }
});

window.addEventListener("touchmove", (e) => {
  if (e.touches.length > 0) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }
});

window.addEventListener("touchend", () => {
  mouse.active = false;
});

function animateParticles() {
  ctx.clearRect(0, 0, width, height);
  
  const linkDist = 95;
  const cursorDist = 135;

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    
    // 1. Draw connection lines between nearby particles
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < linkDist) {
        const opacity = (1 - dist / linkDist) * 0.16 * Math.min(particles[i].opacity, particles[j].opacity);
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(255, 183, 197, ${opacity})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    }
    
    // 2. Draw connections from close particles to the mouse cursor
    if (mouse.active && mouse.x !== null && mouse.y !== null) {
      const dx = particles[i].x - mouse.x;
      const dy = particles[i].y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < cursorDist) {
        const opacity = (1 - dist / cursorDist) * 0.28 * particles[i].opacity;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(196, 30, 95, ${opacity})`;
        ctx.lineWidth = 0.95;
        ctx.stroke();
      }
    }
  }
  
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* --- Click to Spawn Heart Bursts & Floating Words --- */
const romanticWords = [
  "Forever", "Always", "My Love", "Sweetheart", "Mine", "❤️", "Darling", 
  "True Love", "XOXO", "Together", "Adore You", "Beloved", "Soulmate", "Amour"
];
const romanticWordColors = ["#ff4f73", "#fa4843", "#c41e5f", "#db2777", "#ec4899", "#f43f5e"];

const spawnFloatingWord = (x, y) => {
  const word = romanticWords[Math.floor(Math.random() * romanticWords.length)];
  const color = romanticWordColors[Math.floor(Math.random() * romanticWordColors.length)];
  const rotation = Math.floor(Math.random() * 40 - 20) + "deg"; // Random skew/tilt between -20 and 20

  const el = document.createElement("div");
  el.className = "floating-word";
  el.textContent = word;
  el.style.left = x + "px";
  el.style.top = y + "px";
  el.style.color = color;
  el.style.setProperty("--rand-rot", rotation);

  document.body.appendChild(el);

  // Automatically clean up word element after transition ends
  el.addEventListener("animationend", () => {
    el.remove();
  });
};

const crtClickBurst = (x, y) => {
  const burst = new mojs.Burst({
    left: x,
    top: y,
    radius: { 15: 75 },
    count: 8,
    angle: "rand(0, 360)",
    children: {
      shape: "heart",
      fill: ["#ff4f73", "#ff6b8b", "#ff8fa9", "#fa4843", "#ffe3e8"],
      radius: "rand(8, 16)",
      scale: { 1: 0 },
      duration: "rand(700, 1100)",
      degreeShift: "rand(-30, 30)",
      easing: "quint.out"
    }
  });

  const sparkles = new mojs.Burst({
    left: x,
    top: y,
    radius: { 5: 55 },
    count: 6,
    children: {
      shape: "circle",
      fill: "#ffffff",
      radius: "rand(2, 4)",
      scale: { 1: 0 },
      duration: "rand(400, 750)",
      easing: "quad.out"
    }
  });

  burst.play();
  sparkles.play();
};

window.addEventListener("click", (e) => {
  if (e.target.closest(".sound")) return;
  crtClickBurst(e.clientX, e.clientY);
  spawnFloatingWord(e.clientX, e.clientY);
});