import { observable, action, runInAction, computed } from "mobx";
import { searchMusic } from "../api/api";
import { Howl } from "howler";
import { PlayerHandler } from "../player-handler/player-handler";

class MusicSearchStore {
  @observable term = "Год змеи";
  @observable artist;
  @observable playList = [];
  @observable status = "";
  @observable currentSong = null;
  @observable currentSongIndex = 0;
  @observable songInstance; // TODO: do not foget to set 'null' after currentSongIndex change
  @observable isChoosen = false;
  @observable isPlaying = false;

  @computed
  get isEmpty() {
    return this.playList.length === 0;
  }

  @action.bound
  setSongPlayingStatus(status) {
    this.isPlaying = status;
  }

  @action.bound
  setCurrentSongIndex(newIndex) {
    this.currentSongIndex = newIndex;
  }

  @action.bound
  setCurrentSong(index, id) {
    if (index >= 0) {
      const curByIndex = this.playList[index];
      return (this.currentSong = curByIndex);
    }
    const curById = this.playList.find((song) => song.id === id);
    return (this.currentSong = curById);
  }

  @action.bound
  chooseSong(index) {
    if (this.currentSongIndex === index) {
      return;
    }
    this.songInstance.stop();
    this.setCurrentSongIndex(index);
    this.setCurrentSong(index);
    this.isChoosen = true;
  }

  @action.bound
  setMusicInstance() {
    const song = new PlayerHandler(
      this.currentSongIndex,
      this.currentSong.preview
    );
    return (this.songInstance = song.setPlayer());
  }

  @action.bound
  resetCurrentSong() {
    try {
      this.songInstance.stop();
      this.songInstance = null;
      this.currentSongIndex = 0;
    } catch (error) {
      console.log(error);
    }
  }

  constructor() {
    this.search();
  }

  @action.bound
  setTerm(value) {
    if (value === this.term) {
      return;
    }
    this.term = value;
  }

  @action.bound
  async search(term = this.term) {
    if (!term) {
      return;
    }
    try {
      this.status = "pending";
      const setStore = (response) => {
        runInAction(() => {
          this.playList = response.data;
          this.status = "compleated";
          this.currentSong = response.data[0];
        });
      };
      DZ.api(`search?q=${term}&&index=0&limit=10`, function (response) {
        console.log("Nam", response);
        setStore(response);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export const store = new MusicSearchStore();
