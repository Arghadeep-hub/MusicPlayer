const music = document.querySelector("audio");
const img = document.querySelector("img");
const play = document.getElementById("play");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let progress = document.getElementById("progress");
let total_duration = document.getElementById("duration");
let current_time = document.getElementById("current_time");
const progress_div = document.getElementById("progress_div");

let volumeUp = document.querySelector(".volume-up");

const songs = [
  {
    name: "music-1",
    title: "Lotus Lane",
    artist: "The Loyalist",
  },
  {
    name: "music-2",
    title: "Sappheiros",
    artist: "Aurora",
  },
  {
    name: "music-3",
    title: "Walking Firiri",
    artist: "Gorkhali Takma",
  },
  {
    name: "music-4",
    title: "Memories",
    artist: "A Shamaluev Music.",
  },
];

let isPlaying = false;

// for play funtion
const playMusic = () => {
  isPlaying = true;
  music.play();
  play.classList.replace("fa-play", "fa-pause");
  img.classList.add("anime");
};

// for pause funtion
const pauseMusic = () => {
  isPlaying = false;
  music.pause();
  play.classList.replace("fa-pause", "fa-play");
  img.classList.remove("anime");
};

play.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});

// changing music data

const loadSong = (songs) => {
  title.textContent = songs.title;
  artist.textContent = songs.artist;
  music.src = "music/" + songs.name + ".mp3";
  img.src = "img/" + songs.name + ".jpg";
};

songIndex = 0;
const nextSong = () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};
const prevSong = () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};

// for progressBar
music.addEventListener("timeupdate", (event) => {
  const { currentTime, duration } = event.srcElement;
  let progress_time = (currentTime / duration) * 100;
  // console.log(progress_time);
  progress.style.width = `${progress_time}%`;

  //Current Duration Update
  let min_currentTime = Math.floor(currentTime / 60);
  let sec_currentTime = Math.floor(currentTime % 60);

  if (sec_currentTime < 10) {
    sec_currentTime = `0${sec_currentTime}`;
  }
  let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
  current_time.textContent = `${tot_currentTime}`;

  //Music Duration Update
  let min_duration = Math.floor(duration / 60);
  let sec_duration = Math.floor(duration % 60);
  if (sec_duration < 10) {
    sec_duration = `0${sec_duration}`;
  }
  let tot_duration = `${min_duration}:${sec_duration}`;
  if (duration) {
    total_duration.textContent = `${tot_duration}`;
  }
});
//Progress on click functionality
progress_div.addEventListener("click", (event) => {
  // console.log(event);
  const { duration } = music;
  let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
  music.currentTime = move_progress;
  // console.log(move_progress);
});

music.addEventListener("ended", nextSong);

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);

// lets work on Volume
function decreaseVolume() {
  music.volume -= 0.10;
}

function increaseVolume() {
  music.volume += 0.10;
}
// fix the speaker muted button
volumeUp.addEventListener("click", () => {
  if (music.volume === 1) {
    music.volume = 0;
    document.querySelector(".volume-up i").className = "fa fa-volume-mute";
  } else {
    music.volume = 1;
    document.querySelector(".volume-up i").className = "fa fa-volume-up";
  }
});
