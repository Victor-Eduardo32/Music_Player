
import audios from "./data.js";
import { path, secondsToMinutes } from "./utils.js";
import elements from "./playerElements.js";

export default {
    audioData: audios,
    currentAudio: {},
    currentPlaying: 0,
    isPlaying: false,
    start() { 
        elements.get.call(this);  
            
        this.update();        
    },    
    play(){
        this.isPlaying = true;
        this.audio.play();
        this.playPause.innerText = "pause";
    }, 
    pause() {
        this.isPlaying = false;
        this.audio.pause();
        this.playPause.innerText = "play_arrow";
    },
    togglePlayPause(){
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    },
    toggleMute(){
        this.audio.muted = !this.audio.muted;
        this.mute.innerText = this.audio.muted ? "volume_down" : "volume_up";
    },
    next() {
        this.currentPlaying++;
        if(this.currentPlaying == this.audioData.length) this.return();
        this.update();
        this.play();
    },
    setVolume(value) {
        this.audio.volume = value / 100;
    },
    setSeek(value) {
        this.audio.currentTime = value;
    },
    timeUpdate() {
        this.currentDuration.innerText = secondsToMinutes(this.audio.currentTime);
        this.seekbar.value = this.audio.currentTime;

    },
    update() {
        this.currentAudio = this.audioData[this.currentPlaying];
        this.imgMusic.style.background = `url('${path(this.currentAudio.imgMusic)}') no-repeat center center / cover`;
        this.nameGame.innerHTML = `<i class="fa-solid fa-gamepad"></i> ${this.currentAudio.nameGame}`;
        this.nameMusic.innerText = this.currentAudio.nameMusic;
        this.descriptionMusic.innerText = this.currentAudio.descriptionMusic;
        elements.createAudioElement.call(this, path(this.currentAudio.audio));

        this.audio.onloadeddata = () => {
            elements.actions.call(this); 
        };
     },
    return() {
        this.currentPlaying = 0;
        this.update();
    }
    
};