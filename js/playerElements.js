import { secondsToMinutes } from "./utils.js";

export default {
    get() {
        this.nameGame =  document.querySelector('.nameGame');
        this.imgMusic =  document.querySelector('.imgMusic');
        this.nameMusic =  document.querySelector('.nameMusic');
        this.descriptionMusic =  document.querySelector('.descriptionMusic');
        this.playPause = document.querySelector('#play-pause');
        this.mute = document.querySelector( '#mute');
        this.volume = document.querySelector('#vol-control');
        this.seekbar = document.querySelector('#seekbar');
        this.currentDuration = document.querySelector('#current-duration');
        this.totalDuration = document.querySelector('#total-duration');
    },
    createAudioElement(audio){
        this.audio = new Audio(audio);
    },
    actions(){
        this.audio.onended = () => this.next();
        this.audio.ontimeupdate = () => this.timeUpdate();
        this.playPause.onclick = () => this.togglePlayPause();
        this.mute.onclick = () => this.toggleMute();
        this.volume.oninput = () => this.setVolume(this.volume.value);
        this.volume.onchange = () => this.setVolume(this.volume.value);
        this.seekbar.oninput = () => this.setSeek(this.seekbar.value);
        this.seekbar.onchange = () => this.setSeek(this.seekbar.value);
        this.seekbar.max = this.audio.duration;
        this.totalDuration.innerText = secondsToMinutes(this.audio.duration);
    }
};