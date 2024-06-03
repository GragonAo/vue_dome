<template>
  <div>
    <video src="./横版-原神-昼.mp4" muted loop autoplay></video>
    <div class="shell">
      <div class="cover">
        <img src="./1.jpg" alt="">
      </div>
      <div class="info">
        <div class="title">只因你太美</div>
        <div class="singer">坤坤</div>
      </div>
      <div class="volume-box" :class="{ active: volumeActive }">
        <span class="volume-down" @click="handleVolumeDown"><i class="material-icons">remove</i></span>
        <input type="range" class="volume-range" step="1" v-model="volume" min="0" max="100" @input="updateVolume">
        <span class="volume-up" @click="handleVolumeUp"><i class="material-icons">add</i></span>
      </div>
      <div class="btn-box">
        <i class="material-icons repeat" @click="handleRepeat">repeat</i>
        <i class="material-icons favorite" :class="{ active: favoriteActive }" @click="handleFavorite">favorite</i>
        <i class="material-icons volume" :class="{ active: volumeActive }" @click="handleVolume">volume_up</i>
      </div>
      <div class="music-box">
        <input type="range" class="seekbar" step="1" v-model="seekValue" min="0" :max="duration" @input="handleSeekBar">
        <audio ref="music" class="music-element" @loadeddata="onLoadedData" @timeupdate="onTimeUpdate" @ended="onEnded">
          <source src="./鸡你太美.m4a">
        </audio>
        <span class="current-time">{{ currentTimeFormatted }}</span>
        <span class="duration">{{ durationFormatted }}</span>
        <span class="play" @click="handlePlayPause">
          <i class="material-icons">{{ isPlaying ? 'pause' : 'play_arrow' }}</i>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';

const music = ref<HTMLAudioElement | null>(null);
const playBtn = ref<HTMLSpanElement | null>(null);
const seekbar = ref<number>(0);
const currentTime = ref(0);
const duration = ref(0);
const isPlaying = ref(false);
const favoriteActive = ref(false);
const volumeActive = ref(false);
const volume = ref(80);

const currentTimeFormatted = computed(() => formatTime(currentTime.value));
const durationFormatted = computed(() => formatTime(duration.value));

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

const handlePlayPause = () => {
  if (!music.value) return;
  if (music.value.paused) {
    music.value.play();
    isPlaying.value = true;
  } else {
    music.value.pause();
    isPlaying.value = false;
  }
};

const handleSeekBar = () => {
  if (music.value) {
    music.value.currentTime = seekbar.value;
  }
};

const handleFavorite = () => {
  favoriteActive.value = !favoriteActive.value;
};

const handleRepeat = () => {
  if (music.value) {
    music.value.loop = !music.value.loop;
  }
};

const handleVolume = () => {
  volumeActive.value = !volumeActive.value;
};

const handleVolumeDown = () => {
  volume.value = Math.max(0, volume.value - 20);
  if (music.value) {
    music.value.volume = volume.value / 100;
  }
};

const handleVolumeUp = () => {
  volume.value = Math.min(100, volume.value + 20);
  if (music.value) {
    music.value.volume = volume.value / 100;
  }
};

const updateVolume = () => {
  if (music.value) {
    music.value.volume = volume.value / 100;
  }
};

const onLoadedData = () => {
  if (music.value) {
    duration.value = music.value.duration;
  }
};

const onTimeUpdate = () => {
  if (music.value) {
    currentTime.value = music.value.currentTime;
    seekbar.value = music.value.currentTime;
  }
};

const onEnded = () => {
  isPlaying.value = false;
  if (music.value) {
    music.value.currentTime = 0;
  }
};

onMounted(() => {
  if (music.value) {
    music.value.volume = volume.value / 100;
  }
});
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  font-family: "优设标题黑";
  -webkit-user-select: none;
}

body {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background-color: #6e7cf5;
}

.shell {
  z-index: 99;
  width: 330px;
  height: 580px;
  border-radius: 15px;
  box-shadow: 0 10px 30px #00000085;
  border-top: 1px solid rgba(255, 255, 255, .9);
  border-left: 1px solid rgba(255, 255, 255, .9);
  background: linear-gradient(to right bottom, rgba(255, 255, 255, .6), rgba(255, 255, 255, .3), rgba(255, 255, 255, .2));
  backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cover {
  width: 280px;
  height: 270px;
  overflow: hidden;
  position: absolute;
  top: 20px;
  border-radius: 5px;
  box-shadow: 0 5px 30px #7d70ecb7;
}

.cover img {
  width: 100%;
}

.shell input[type=range] {
  -webkit-appearance: none !important;
  margin: 0px;
  padding: 0px;
  background: rgb(255, 255, 255);
  height: 5px;
  width: 150px;
  outline: none;
  cursor: pointer;
  overflow: hidden;
  border-radius: 5px;
}

.shell input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none !important;
  background: #ff3677;
  height: 5px;
  width: 5px;
  border-radius: 50%;
  box-shadow: -100vw 0 0 100vw rgb(160, 200, 250);
}

.shell input[type=range]::-moz-range-thumb {
  background: #ff3677;
  height: 8px;
  width: 8px;
  border-radius: 100%;
}

.shell input[type=range]::-ms-thumb {
  -webkit-appearance: none !important;
  background: #ff3677;
  height: 8px;
  width: 8px;
  border-radius: 100%;
}

.info {
  position: absolute;
  top: 305px;
  text-align: center;
}

.info .title {
  font-size: 35px;
  color: rgb(40, 45, 100);
}

.info .singer {
  font-size: 20px;
  color: #6e7cf5;
}

.btn-box {
  position: absolute;
  top: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.btn-box i {
  font-size: 24px;
  color: rgb(40, 45, 100);
  margin: 0 30px;
  cursor: pointer;
}

.btn-box i.active {
  color: #ff3677;
}

.volume-box {
  display: none;
  position: absolute;
  top: 370px;
  z-index: 1;
  padding: 0 20px;
}

.volume-box .volume-down {
  position: absolute;
  left: -15px;
  cursor: pointer;
  color: rgb(40, 45, 100);
}

.volume-box .volume-up {
  position: absolute;
  right: -15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: rgb(40, 45, 100);
}

.volume-box .volume-up::selection {
  background-color: unset;
}

.volume-box input[type=range] {
  height: 5px;
  width: 150px;
  margin: 0 0 15px 0;
}

.volume-box.active {
  display: block;
}

.music-box {
  position: absolute;
  top: 445px;
}

.music-box input[type=range] {
  height: 5px;
  width: 230px;
  margin: 0 0 10px 0;
}

.music-box input[type=range]::-webkit-slider-thumb {
  height: 5px;
  width: 7px;
}

.music-box .current-time {
  position: absolute;
  left: -35px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #252525;
}

.music-box .duration {
  position: absolute;
  right: -35px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: rgb(40, 45, 100);
}

.music-box .play,
.music-box .pause {
  position: absolute;
  left: 50%;
  top: 55px;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: rgb(160, 200, 250);
  cursor: pointer;
  transition: all 0.4s;
}

.music-box .play i,
.music-box .pause i {
  font-size: 36px;
  color: rgb(40, 45, 100);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-48%, -50%);
}

.music-box .pause i {
  font-size: 32px;
  transform: translate(-50%, -50%);
}

video {
  position: absolute;
  width: 100%;
}
</style>
