export const createConfettiAnimation = () => {
  for (let i = 0; i < 1000; i++) {
    let randomRotation = Math.floor(Math.random() * 360);
    let randomScale = Math.random() * 1;
    let randomWidth = Math.floor(Math.random() * Math.max(document.documentElement.clientWidth, window.innerWidth || 0));
    let randomHeight = Math.floor(Math.random() * Math.max(document.documentElement.clientHeight, window.innerHeight || 500));
    let randomAnimationDelay = Math.floor(Math.random() * 15);
    let colors = ["#0CD977", "#FF1C1C", "#FF93DE", "#5767ED", "#FFC61C", "#8497B0"];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    let confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.top = `${randomHeight}px`;
    confetti.style.right = `${randomWidth}px`;
    confetti.style.backgroundColor = randomColor;
    confetti.style.obacity = randomScale;
    confetti.style.transform = `skew(15deg) rotate(${randomRotation}deg)`;
    confetti.style.animationDelay = `${randomAnimationDelay}s`;
    document.getElementById("root").appendChild(confetti);
  }
};

export const removeConfettiAnimation = () => {
  const confetti = document.getElementsByClassName("confetti");
  const root = document.getElementById("root");
  [...confetti].forEach((child) => {
    root.removeChild(child);
  });
};
