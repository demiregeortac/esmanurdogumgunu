const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

// Firework Particle Class
class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 3 + 2;
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * 6 - 3;
    this.alpha = 1;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.02;
  }
}

// Create Firework Particles
function createFireworks(x, y) {
  const colors = ["#ff4500", "#ffd700", "#1e90ff", "#32cd32", "#ff1493"];
  for (let i = 0; i < 100; i++) {
    particles.push(
      new Particle(x, y, colors[Math.floor(Math.random() * colors.length)])
    );
  }
}

// Animate Fireworks
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter((p) => p.alpha > 0);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animate);
}

// Button Click Event for Fireworks and Sound
document.getElementById("celebrateButton").addEventListener("click", () => {
  // Play Fireworks Sound
  const sound = document.getElementById("fireworksSound");
  if (sound) {
    sound.currentTime = 0; // Restart the sound
    sound.play(); // Play the sound
  }

  // Trigger Fireworks Animation
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  createFireworks(x, y);

  // Multiple Random Fireworks
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      createFireworks(x, y);
    }, i * 500);
  }
});

// Start the Animation Loop
animate();
