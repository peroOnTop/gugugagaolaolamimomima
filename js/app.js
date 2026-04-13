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

// ================= MUSIC SYSTEM (KORRIGIERT) =================
const overlay = document.getElementById("introOverlay");
const music = document.getElementById("bgMusic");
const skipBtn = document.getElementById("skipBtn");
const volumeSlider = document.getElementById("volumeSlider");

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

// Random ohne Wiederholung
function getRandomSong() {
  let newSong;
  do {
    newSong = songs[Math.floor(Math.random() * songs.length)];
  } while (newSong === currentSong && songs.length > 1);
  currentSong = newSong;
  return newSong;
}

// Play mit Fade IN auf Ziel-Lautstärke
function playRandomSong(targetVolume = 0.15) {
  const song = getRandomSong();
  music.src = song;
  music.volume = 0;

  music.play().catch((e) => {
    console.log("Autoplay blocked:", e);
  });

  let vol = 0;
  const fadeIn = setInterval(() => {
    if (vol < targetVolume) {
      vol += 0.01;
      music.volume = Math.min(vol, targetVolume);
    } else {
      clearInterval(fadeIn);
    }
  }, 50);
}

// Fade OUT + nächster Song
function nextSong() {
  let vol = music.volume;
  const fadeOut = setInterval(() => {
    if (vol > 0) {
      vol -= 0.05;
      music.volume = Math.max(vol, 0);
    } else {
      clearInterval(fadeOut);
      playRandomSong(volumeSlider ? parseFloat(volumeSlider.value) : 0.15);
    }
  }, 100);
}

// NUR EINEN Listener für das Overlay
if (overlay) {
  overlay.addEventListener("click", () => {
    overlay.classList.add("hidden");
    
    // Volume Slider auf 0.15 setzen (oder Standard)
    if (volumeSlider) {
      volumeSlider.value = "0.10";
    }
    
    playRandomSong(0.10); // Startet mit Ziel-Lautstärke 0.15
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

// Volume Slider
if (volumeSlider) {
  volumeSlider.addEventListener("input", function() {
    music.volume = parseFloat(volumeSlider.value);
  });
}
