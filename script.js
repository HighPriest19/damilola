const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const title = document.getElementById("title");
const text = document.getElementById("text");
const mainGif = document.getElementById("mainGif");
const buttons = document.getElementById("buttons");
const formArea = document.getElementById("formArea");
const setBtn = document.getElementById("setBtn");

function playClick() {
  const click = new Audio("public/click.mp3");
  click.play();
}

function playMusic() {
  const music = new Audio("public/love-song.mp3");
  music.loop = true;
  music.play();
}

noBtn.addEventListener("mouseover", () => {
  noBtn.style.left = Math.random() * 220 - 110 + "px";
  noBtn.style.top = Math.random() * 160 - 80 + "px";
});

noBtn.addEventListener("click", () => {
  noBtn.style.left = Math.random() * 220 - 110 + "px";
  noBtn.style.top = Math.random() * 160 - 80 + "px";
});

yesBtn.addEventListener("click", () => {
  playClick();
  playMusic();

  title.innerText = "Wait... you actually said yes?? 😭";
  text.innerText = "I was so ready for you to say no 😭😭";
  mainGif.src = "public/spongebob.gif";
  buttons.innerHTML = `<button id="okayBtn">Okay Okay! ✨</button>`;

  document.getElementById("okayBtn").onclick = () => {
    title.innerText = "So... when are you free?";
    text.innerText = "Pick a date and time 😹";
    mainGif.src = "public/cat.gif";
    buttons.style.display = "none";
    formArea.classList.remove("hidden");
  };
});

setBtn.addEventListener("click", () => {
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const feeling = document.getElementById("feeling").value;

  title.innerText = "Glad you didn’t say no 😏";
  text.innerHTML = `Be ready by ${time || "6:00"}, I’m coming to get you 🏎️<br><br>
  Date: ${date || "our chosen day"}<br>
  Vibe: ${feeling}<br><br>
  P.S. Normal people text. I made a website for you instead of gaming my ass off 😭💕`;

  mainGif.src = "public/shrek.gif";
  formArea.classList.add("hidden");
});

for (let i = 0; i < 35; i++) {
  const rose = document.createElement("div");
  rose.className = "rose";
  rose.innerText = "🌹";
  rose.style.left = Math.random() * 100 + "vw";
  rose.style.animationDuration = 5 + Math.random() * 8 + "s";
  rose.style.animationDelay = Math.random() * 5 + "s";
  document.body.appendChild(rose);
}
