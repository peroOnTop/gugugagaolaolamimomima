import { initializeTheme } from './modules/theme.js';
import { initializeShare } from './modules/share.js';

document.addEventListener("DOMContentLoaded", () => {
    initializeTheme();
    initializeShare();
});

// ================= PRODUCTS TOGGLE =================
const toggleBtn = document.getElementById("productsToggle");
const productsSection = document.getElementById("productsSection");

if (toggleBtn) {
  toggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    productsSection.classList.toggle("hidden");
    productsSection.scrollIntoView({ behavior: "smooth" });
  });
}

// ================= MUSIC SYSTEM =================
const overlay = document.getElementById("introOverlay");
const music = document.getElementById("bgMusic");
const skipBtn = document.getElementById("skipBtn");

const songs = [
  "assets/music1.mp3",
  "assets/music2.mp3",
  "assets/music3.mp3",
  "assets/music4.mp3",
  "assets/music5.mp3",
  "assets/music6.mp3",
  "assets/music7.mp3",
  "assets/music8.mp3",
];

let currentSong = "";

// Random OHNE Wiederholung
function getRandomSong() {
  let newSong;

  do {
    newSong = songs[Math.floor(Math.random() * songs.length)];
  } while (newSong === currentSong);

  currentSong = newSong;
  return newSong;
}

// Play mit Fade IN
function playRandomSong() {
  const song = getRandomSong();

  music.src = song;
  music.volume = 0;

  music.play().catch(() => {
    console.log("Autoplay blocked");
  });

  let vol = 0;
  const fadeIn = setInterval(() => {
    if (vol < 1) {
      vol += 0.05;
      music.volume = vol;
    } else {
      clearInterval(fadeIn);
    }
  }, 100);
}

// Fade OUT + nächster Song
function nextSong() {
  let vol = music.volume;

  const fadeOut = setInterval(() => {
    if (vol > 0) {
      vol -= 0.05;
      music.volume = vol;
    } else {
      clearInterval(fadeOut);
      playRandomSong();
    }
  }, 100);
}

// Start bei Klick
if (overlay) {
  overlay.addEventListener("click", () => {
    overlay.classList.add("hidden");
    playRandomSong();
  });
}

// Auto nächster Song
if (music) {
  music.addEventListener("ended", nextSong);
}

// Skip Button
if (skipBtn) {
  skipBtn.addEventListener("click", nextSong);
}