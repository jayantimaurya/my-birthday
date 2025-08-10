/*  ==== CONFIG ====
 * Edit these values:
 * - BIRTHDAY: ISO string for the target moment (YYYY-MM-DDTHH:mm:ss). Change to her date/time.
 * - MUSIC: add 'song.mp3' to the folder (or change src in index.html)
 */
const BIRTHDAY = "2025-12-31T20:00:00"; // <-- change this to her date/time (ISO)
const TYPEWRITER_TEXT = "🎉 Happy Birthday, My Love. Today is your day — let's make memories. ❤️";
const QUIZ_QUESTIONS = [
  {
    q: "What's my favourite movie snack?",
    options: ["Popcorn", "Chocolate", "Chips", "Ice cream"],
    answer: 0,
    fun: "Popcorn + your hand in mine — perfect combo."
  },
  {
    q: "Where did we first meet?",
    options: ["Cafe", "Park", "Online", "Bookstore"],
    answer: 1,
    fun: "You remember the bench and that sky? I do."
  },
  {
    q: "What's my go-to silly dance?",
    options: ["The twirl", "The shimmy", "The robot", "The slide"],
    answer: 2,
    fun: "Robot moves but heart is all you."
  }
];
const LOVE_NOTES = [
  "You make ordinary days feel like adventures.",
  "I love how you laugh when you are surprised.",
  "Your kindness is my daily inspiration.",
  "I promise to keep learning to dance with you."
];
/*  ==== END CONFIG ==== */


/* ---- Typewriter ---- */
(function typewriter() {
  const el = document.getElementById("typewriter");
  let i = 0;
  function tick() {
    if (i <= TYPEWRITER_TEXT.length) {
      el.textContent = TYPEWRITER_TEXT.slice(0, i);
      i++;
      setTimeout(tick, 50 + Math.random() * 80);
    }
  }
  tick();
})();

/* ---- CANVAS SETUP: particles + fireworks ---- */
const bgCanvas = document.getElementById("bgCanvas");
const bgCtx = bgCanvas.getContext("2d");
const fwCanvas = document.getElementById("fireworksCanvas");
const fwCtx = fwCanvas.getContext("2d");

function resize() {
  bgCanvas.width = fwCanvas.width = window.innerWidth;
  bgCanvas.height = fwCanvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* Background floating sparkles */
let stars = [];
function initStars(n = Math.floor(window.innerWidth / 8)) {
  stars = [];
  for (let i = 0; i < n; i++) {
    stars.push({
      x: Math.random() * bgCanvas.width,
      y: Math.random() * bgCanvas.height,
      r: 0.8 + Math.random() * 2.2,
      a: 0.1 + Math.random() * 0.9,
      vy: 0.2 + Math.random() * 0.6
    });
  }
}
initStars();

function drawStars() {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  for (let s of stars) {
    bgCtx.beginPath();
    bgCtx.globalAlpha = s.a;
    bgCtx.fillStyle = "white";
    bgCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    bgCtx.fill();
    s.y -= s.vy;
    if (s.y < -10) {
      s.y = bgCanvas.height + 10;
      s.x = Math.random() * bgCanvas.width;
    }
  }
  bgCtx.globalAlpha = 1;
  requestAnimationFrame(drawStars);
}
drawStars();

/* Fireworks engine (trigger on clicks) */
let fwParticles = [];
function spawnFirework(x, y, color) {
  const count = 40 + Math.floor(Math.random() * 30);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 6;
    fwParticles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 60 + Math.random() * 40,
      color: color || randomColor(),
      size: 2 + Math.random() * 3
    });
  }
}

function randomColor() {
  const pal = ["#ff4f81", "#ff1493", "#ffd700", "#00e6c3", "#7b61ff", "#ff9966"];
  return pal[Math.floor(Math.random() * pal.length)];
}

function animateFireworks() {
  fwCtx.fillStyle = "rgba(4,6,12,0.22)";
  fwCtx.fillRect(0, 0, fwCanvas.width, fwCanvas.height);
  for (let i = fwParticles.length - 1; i >= 0; i--) {
    const p = fwParticles[i];
    p.vy += 0.03; // gravity
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
    fwCtx.beginPath();
    fwCtx.globalAlpha = Math.max(0, p.life / 100);
    fwCtx.fillStyle = p.color;
    fwCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    fwCtx.fill();
    if (p.life <= 0 || p.size <= 0.2) fwParticles.splice(i, 1);
  }
  fwCtx.globalAlpha = 1;
  requestAnimationFrame(animateFireworks);
}
animateFireworks();

/* clicking to create fireworks */
document.addEventListener("click", (e) => {
  // ignore clicks on buttons that have interactive behavior
  const t = e.target;
  const forbidden = ["BUTTON","A","INPUT","TEXTAREA"];
  if (forbidden.includes(t.tagName)) return;
  spawnFirework(e.clientX, e.clientY);
});

/* ---- COUNTDOWN ---- */
function nextOccurrence(dateStr) {
  // parse and if in past, bump to next year (simple fallback)
  const target = new Date(dateStr);
  const now = new Date();
  if (isNaN(target)) return null;
  if (target <= now) {
    // try same month/day next year
    const next = new Date(target);
    next.setFullYear(now.getFullYear() + 1);
    return next;
  }
  return target;
}

let targetDate = nextOccurrence(BIRTHDAY);
if (!targetDate) {
  console.warn("Invalid BIRTHDAY in script.js — set BIRTHDAY to an ISO string.");
  targetDate = new Date(Date.now() + 0); // fallback 7 days
}

function updateCountdown() {
  const now = new Date();
  const diff = Math.max(0, targetDate - now);
  const days = Math.floor(diff / (0));
  const hours = Math.floor(diff / (0));
  const mins = Math.floor(diff / (0));
  const secs = Math.floor(diff / 0);
  document.getElementById("days").textContent = String(days).padStart(2,"0");
  document.getElementById("hours").textContent = String(hours).padStart(2,"0");
  document.getElementById("mins").textContent = String(mins).padStart(2,"0");
  document.getElementById("secs").textContent = String(secs).padStart(2,"0");
}
setInterval(updateCountdown, 1000);
updateCountdown();

/* ---- CAROUSEL (text-only cards) ---- */
const carousel = document.getElementById("carousel");
const prevCard = document.getElementById("prevCard");
const nextCard = document.getElementById("nextCard");
let index = 0;
function showCard(i) {
  const items = carousel.querySelectorAll(".cardItem");
  const w = items[0].offsetWidth + 14; // gap
  index = Math.max(0, Math.min(i, items.length - 1));
  carousel.style.transform = `translateX(${-index * w}px)`;
}
prevCard.addEventListener("click", () => showCard(index - 1));
nextCard.addEventListener("click", () => showCard(index + 1));
window.addEventListener("load", () => showCard(0));

/* ---- QUIZ ---- */
let quizIndex = 0;
let score = 0;
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizNext = document.getElementById("quizNext");
const quizRestart = document.getElementById("quizRestart");
const quizResult = document.getElementById("quizResult");

function showQuiz(i=0) {
  quizIndex = i; score = 0; quizResult.textContent = "";
  renderQuestion();
}
function renderQuestion() {
  const q = QUIZ_QUESTIONS[quizIndex];
  quizQuestion.textContent = q.q;
  quizOptions.innerHTML = "";
  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "opt-btn";
    btn.textContent = opt;
    btn.addEventListener("click", () => handleAnswer(idx, btn));
    quizOptions.appendChild(btn);
  });
}
function handleAnswer(idx, btn) {
  const q = QUIZ_QUESTIONS[quizIndex];
  const opts = [...quizOptions.children];
  opts.forEach(b => b.disabled = true);
  if (idx === q.answer) {
    btn.classList.add("correct");
    score++;
    quizResult.innerText = q.fun;
  } else {
    btn.classList.add("wrong");
    // highlight correct
    opts[q.answer].classList.add("correct");
    quizResult.innerText = q.fun;
  }
}
quizNext.addEventListener("click", () => {
  if (quizIndex < QUIZ_QUESTIONS.length - 1) {
    quizIndex++;
    quizResult.textContent = "";
    renderQuestion();
  } else {
    quizResult.innerHTML = `Quiz finished — You scored ${score}/${QUIZ_QUESTIONS.length}. <br> Thanks for playing ❤️`;
  }
});
quizRestart.addEventListener("click", () => showQuiz(0));
showQuiz(0);

/* ---- LOVE NOTES (floating clickable hearts) ---- */
const notesList = document.getElementById("notesList");

// create clickable note pills as list (also spawn floating hearts)
LOVE_NOTES.forEach((note, i) => {
  const pill = document.createElement("div");
  pill.className = "note-pill";
  pill.textContent = `💖  Note ${i+1}`;
  pill.addEventListener("click", () => {
    pill.classList.toggle("note-revealed");
    pill.textContent = pill.classList.contains("note-revealed") ? `💌 ${note}` : `💖  Note ${i+1}`;
  });
  notesList.appendChild(pill);
});

// spawn floating hearts on the right side
(function spawnHearts() {
  const container = document.body;
  function createHeart() {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = "💘";
    heart.style.position = "fixed";
    heart.style.left = `${70 + Math.random() * 220}px`;
    heart.style.top = `${window.innerHeight - 60}px`;
    heart.style.fontSize = `${12 + Math.random() * 18}px`;
    heart.style.zIndex = 1;
    heart.style.cursor = "pointer";
    heart.style.opacity = Math.random() * 0.9 + 0.2;
    container.appendChild(heart);
    // animate up
    let y = parseFloat(heart.style.top);
    const vx = (Math.random() - 0.5) * 0.6;
    const speed = 0.6 + Math.random() * 1.6;
    const id = setInterval(() => {
      y -= speed;
      heart.style.top = y + "px";
      heart.style.left = parseFloat(heart.style.left) + vx + "px";
      if (y < -40) {
        clearInterval(id);
        heart.remove();
      }
    }, 30);
    heart.addEventListener("click", () => {
      alert(noteForClick());
      heart.remove();
    });
  }
  function noteForClick() {
    // random sweet message
    const msgs = [
      "You make every little thing better. ❤️",
      "Your smile is my favourite light.",
      "Because of you, I laugh a little harder.",
      "Thank you for being you — stay forever mine."
    ];
    return msgs[Math.floor(Math.random() * msgs.length)];
  }
  // spawn a few hearts initially
  for (let i=0;i<6;i++) setTimeout(createHeart, i * 500 + Math.random()*800);
  // spawn occasionally
  setInterval(createHeart, 3500 + Math.random() * 3000);
})();

/* ---- UNWRAP GIFT GAME ---- */
const giftBox = document.getElementById("giftBox");
const giftReveal = document.getElementById("giftReveal");
let unwrapStage = 0;
const UNWRAP_STAGES = [
  "It’s sealed with kisses... 💋 (keep clicking!)",
  "The ribbon loosens… almost there… 🎀",
  "You see a sparkle… ✨ (one more click!)",
  "SURPRISE! I love you more than words — happy birthday! ❤️"
];

function setGiftStage(n) {
  giftBox.classList.toggle("open", n >= 2);
  giftReveal.textContent = UNWRAP_STAGES[n] || "";
}

giftBox.addEventListener("click", () => {
  unwrapStage = Math.min(unwrapStage + 1, UNWRAP_STAGES.length - 1);
  setGiftStage(unwrapStage);
  if (unwrapStage === UNWRAP_STAGES.length - 1) {
    // make a little fireworks burst above the box
    const rect = giftBox.getBoundingClientRect();
    spawnFirework(rect.left + rect.width/2, rect.top + 20);
  }
});

giftBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    giftBox.click();
  }
});
setGiftStage(unwrapStage);

/* ---- GIFT OPEN BUTTON (hero) ---- */
const openGiftBtn = document.getElementById("openGiftBtn");
openGiftBtn.addEventListener("click", () => {
  // scroll to gift and highlight
  document.querySelector(".unwrap").scrollIntoView({behavior:"smooth", block:"center"});
  spawnFirework(window.innerWidth/2, window.innerHeight/2, "#ffd700");
});

/* ---- MUSIC PLAYER ---- */
const bgMusic = document.getElementById("bgMusic");
const toggleMusic = document.getElementById("toggleMusic");
let musicOn = false;
toggleMusic.addEventListener("click", () => {
  if (!musicOn) {
    bgMusic.play().catch(()=>{ alert("Autoplay blocked: press Play on the audio control if it doesn't start.") });
    toggleMusic.textContent = "Pause Music ⏸️";
  } else {
    bgMusic.pause();
    toggleMusic.textContent = "Play Music ▶️";
  }
  musicOn = !musicOn;
});

/* ---- small accessibility: keyboard fires fireworks with space on body (unless focused) ---- */
document.body.addEventListener("keydown", (e) => {
  if (e.key === " " && document.activeElement === document.body) {
    e.preventDefault();
    spawnFirework(window.innerWidth/2, window.innerHeight/3);
  }
});
