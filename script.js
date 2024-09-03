// Header DOM
const themeChanger = document.querySelector(".theme-changer");

// Filter DOM
const narutoFilter = document.querySelector(".naruto-filter");
const borutoFilter = document.querySelector(".boruto-filter");

// Music DOM
const musicList = document.querySelector(".music-list");

// Player DOM
const player = document.querySelector(".player");
const playerDataImg = document.querySelector(".player-header .img");
const playerDataTitle = document.querySelector(".player-header .name");
const playerDataSinger = document.querySelector(".player-header .singer");
const audio = document.querySelector("#audio");
const playerBarContainer = document.querySelector(".player-bar-container");
const playerBarInner = document.querySelector(".player-bar-inner");
const backwardBtn = document.querySelector(".backward-btn");
const playPauseBtn = document.querySelector(".play-pause-btn");
const forwardBtn = document.querySelector(".forward-btn");

// Themes
const themes = ["naruto", "shippuden", "boruto", "tbv"];
let currentThemeIndex = localStorage.getItem("theme");

// Playlist
const playlist = [
  {
    title: "Baton Road",
    singer: "KANA-BOON",
    gen: "boruto"
  },
  {
    title: "Blue Bird",
    singer: "Ikimonogakari",
    gen: "naruto"
  },
  {
    title: "Central",
    singer: "Ami Sakaguchi",
    gen: "boruto"
  },
  {
    title: "Diver",
    singer: "NICO touches the wall",
    gen: "naruto"
  },
  {
    title: "Golden Time",
    singer: "Fujifabric",
    gen: "boruto"
  },
  {
    title: "Kaze",
    singer: "Yamazaru",
    gen: "naruto"
  },
  {
    title: "Mata Ne",
    singer: "Humbreaders",
    gen: "boruto"
  },
  {
    title: "Silhoutte",
    singer: "KANA-BOON",
    gen: "naruto"
  },
  {
    title: "Tsuki no Ookisa",
    singer: "Nogisaka48",
    gen: "naruto"
  },
  {
    title: "Voltage",
    singer: "Anly",
    gen: "boruto"
  }
];
let renderedPlaylist = [...playlist];
let selectedPlaylist = [...playlist];
let currentPlayingIndex = -1;

// Init
renderPlaylist();

// Playlist functions
function renderPlaylist() {
  musicList.innerHTML = "";

  renderedPlaylist.forEach((song, index) => {
    const music = document.createElement("li");

    music.classList.add("music");
    music.setAttribute("data-index", index);

    music.innerHTML = `
      <img src="./assets/images/${song.title}.jpg" alt="alt image" class="img" />
      <div class="data">
        <span class="name">${song.title}</span>
        <span class="singer">${song.singer}</span>
      </div>
    `;

    music.addEventListener("click", (e) =>
      changeMusic(+e.target.getAttribute("data-index"))
    );

    musicList.appendChild(music);
  });
}

// Theme changer listener & functions
themeChanger.addEventListener("click", changeTheme);

function changeTheme() {
  if (
    typeof currentThemeIndex !== "number" ||
    currentThemeIndex < 0 ||
    currentThemeIndex >= themes.length - 1
  ) {
    currentThemeIndex = -1;
  }

  currentThemeIndex++;
  localStorage.setItem("theme", currentThemeIndex);
  document.documentElement.setAttribute(
    "data-theme",
    themes[currentThemeIndex]
  );
}

// Player control listener & functions
playPauseBtn.addEventListener("click", playPause);
backwardBtn.addEventListener("click", backwardMusic);
forwardBtn.addEventListener("click", forwardMusic);
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", forwardMusic);
playerBarContainer.addEventListener("click", setProgress);

function changeMusic(index) {
  selectedPlaylist = [...renderedPlaylist];
  currentPlayingIndex = index;

  const currentSong = selectedPlaylist[currentPlayingIndex];
  playerDataImg.src = `assets/images/${currentSong.title}.jpg`;
  playerDataTitle.innerText = currentSong.title;
  playerDataSinger.innerText = currentSong.singer;
  audio.src = `./assets/musics/${currentSong.title}.mp3`;

  player.classList.add("playing");
  playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  audio.play();
}

function playPause() {
  if (currentPlayingIndex === -1) return;

  if (player.classList.contains("playing")) {
    player.classList.remove("playing");
    playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    audio.pause();
    return;
  } else {
    player.classList.add("playing");
    playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    audio.play();
  }
}

function backwardMusic() {
  if (currentPlayingIndex === -1) return;
  else if (currentPlayingIndex === 0) changeMusic(selectedPlaylist.length - 1);
  else changeMusic(--currentPlayingIndex);
}

function forwardMusic() {
  if (currentPlayingIndex === -1) return;
  else if (currentPlayingIndex === selectedPlaylist.length - 1) changeMusic(0);
  else changeMusic(++currentPlayingIndex);
}

function updateProgress(e) {
  const { duration, currentTime } = e.target;
  const progress = (currentTime / duration) * 100;
  playerBarInner.style.width = `${progress}%`;
}

function setProgress(e) {
  const width = e.target.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Filter Listener & functions
narutoFilter.addEventListener("click", setNarutoPlaylist);
borutoFilter.addEventListener("click", setBorutoPlaylist);

function setNarutoPlaylist() {
  if (narutoFilter.classList.contains("active")) {
    narutoFilter.classList.remove("active");
    renderedPlaylist = [...playlist];
    renderPlaylist();
  } else {
    narutoFilter.classList.add("active");
    borutoFilter.classList.remove("active");
    renderedPlaylist = playlist.filter((song) => song.gen === "naruto");
    renderPlaylist();
  }
}

function setBorutoPlaylist() {
  if (borutoFilter.classList.contains("active")) {
    borutoFilter.classList.remove("active");
    renderedPlaylist = [...playlist];
    renderPlaylist();
  } else {
    borutoFilter.classList.add("active");
    narutoFilter.classList.remove("active");
    renderedPlaylist = playlist.filter((song) => song.gen === "boruto");
    renderPlaylist();
  }
}
