const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (isDesktop) {
  const cursorGlow = document.querySelector(".cursor-glow");

  if (cursorGlow) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let last = 0;

    function animateCursor() {
      currentX += (mouseX - currentX) * 0.18;
      currentY += (mouseY - currentY) * 0.18;

      cursorGlow.style.left = currentX + "px";
      cursorGlow.style.top = currentY + "px";

      requestAnimationFrame(animateCursor);
    }

    function spawnPetal(x, y) {
      const petal = document.createElement("span");
      petal.className = "cursor-petal";

      const size = 6 + Math.random() * 6;
      const drift = (Math.random() - 0.5) * 40;
      const rotate = (Math.random() - 0.5) * 180;
      const duration = 700;

      petal.style.width = size + "px";
      petal.style.height = size * 0.7 + "px";
      petal.style.left = x + "px";
      petal.style.top = y + "px";
      petal.style.setProperty("--drift-x", drift + "px");
      petal.style.setProperty("--rotate-end", rotate + "deg");
      petal.style.animationDuration = duration + "ms";

      document.body.appendChild(petal);

      setTimeout(() => {
        petal.remove();
      }, duration);
    }

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const now = Date.now();
      if (now - last > 30) {
        spawnPetal(e.clientX, e.clientY);
        last = now;
      }
    });

    window.addEventListener("mouseleave", () => {
      cursorGlow.classList.add("cursor-hidden");
    });

    window.addEventListener("mouseenter", () => {
      cursorGlow.classList.remove("cursor-hidden");
    });

    animateCursor();
  }
}