const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const title = document.getElementById("title");
const text = document.getElementById("text");
const smallText = document.getElementById("smallText");
const mainGif = document.getElementById("mainGif");
const buttons = document.getElementById("buttons");
const formArea = document.getElementById("formArea");
const setBtn = document.getElementById("setBtn");
const stepBadge = document.getElementById("stepBadge");

let musicStarted = false;
let music;

function playClick() {
  const click = new Audio("public/click.mp3");
  click.currentTime = 0;
  click.play().catch(() => {});
}

function playMusic() {
  if (musicStarted) return;
  music = new Audio("public/love-song.mp3");
  music.loop = true;
  music.volume = 0.45;
  music.play().catch(() => {});
  musicStarted = true;
}

function typeText(element, message) {
  element.innerHTML = "";
  let i = 0;
  const timer = setInterval(() => {
    element.innerHTML += message[i];
    i++;
    if (i >= message.length) clearInterval(timer);
  }, 35);
}

function heartBurst() {
  for (let i = 0; i < 35; i++) {
    const b = document.createElement("div");
    b.className = "burst";
    b.innerText = ["💕", "😭", "✨", "🌹", "😹"][Math.floor(Math.random() * 5)];
    b.style.left = "50vw";
    b.style.top = "50vh";
    b.style.setProperty("--x", Math.random() * 500 - 250 + "px");
    b.style.setProperty("--y", Math.random() * 500 - 250 + "px");
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 1300);
  }
}

function moveNo() {
  noBtn.style.left = Math.random() * 230 - 115 + "px";
  noBtn.style.top = Math.random() * 170 - 85 + "px";
  noBtn.innerText = ["No 😭", "Catch me first 💀", "Unavailable 😹", "Try again 🏃‍♂️"][Math.floor(Math.random() * 4)];
}

noBtn.addEventListener("mouseover", moveNo);
noBtn.addEventListener("click", moveNo);
noBtn.addEventListener("touchstart", moveNo);

yesBtn.addEventListener("click", () => {
  playClick();
  playMusic();
  heartBurst();

  stepBadge.innerText = "Step 2 / 5";
  mainGif.src = "public/spongebob.gif";
  title.innerText = "WAIT 😭";
  typeText(text, "You actually said yes?? I was so ready for you to say no 😭😭");
  smallText.innerText = "Okay okay, let me act normal for 2 seconds.";

  buttons.innerHTML = `<button id="okayBtn" class="yes">Okay Okay! ✨</button>`;

  document.getElementById("okayBtn").onclick = () => {
    playClick();

    stepBadge.innerText = "Step 3 / 5";
    mainGif.src = "public/cat.gif";
    title.innerText = "So...";
    typeText(text, "When are you free?");
    smallText.innerText = "Pick properly, my heart is loading 😹";

    buttons.style.display = "none";
    formArea.classList.remove("hidden");
  };
});

setBtn.addEventListener("click", () => {
  playClick();

  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const feeling = document.getElementById("feeling").value;

  stepBadge.innerText = "Final Step 💕";
  mainGif.src = "public/shrek.gif";
  title.innerText = "Glad you didn’t say no 😏";

  text.innerHTML = `
    Be ready by ${time || "6:00"}, I’m coming to get you 🏎️
    <div class="ticket">
      🎟️ Date Ticket<br><br>
      📅 Date: ${date || "our chosen day"}<br>
      ⏰ Time: ${time || "6:00"}<br>
      🍹 Vibe: ${feeling}<br><br>
      P.S. Normal people text. I made a website for you instead of gaming my ass off 😭💕
    </div>
  `;

  smallText.innerText = "Screenshot this. Evidence has been collected 😹";
  formArea.classList.add("hidden");
  heartBurst();
});

for (let i = 0; i < 45; i++) {
  const rose = document.createElement("div");
  rose.className = "rose";
  rose.innerText = Math.random() > 0.3 ? "🌹" : "💕";
  rose.style.left = Math.random() * 100 + "vw";
  rose.style.fontSize = 16 + Math.random() * 18 + "px";
  rose.style.animationDuration = 5 + Math.random() * 9 + "s";
  rose.style.animationDelay = Math.random() * 6 + "s";
  document.body.appendChild(rose);
}
