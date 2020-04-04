import {observable, action, runInAction, computed} from 'mobx';
import {searchMusic, getPlayList} from '../api/api';

class MusicSearchStore {
    @observable term = 'adele';
    @observable artist;
    @observable playList = [];
    @observable status = '';

    @computed
    get isEmpty() {
        return this.playList.length === 0;
    }

    constructor() {
        this.search();
    }

    @action.bound
    setTerm(value) {
        this.term = value;
    }

    @action.bound
    async search() {
        try {
            this.status = 'pending';
            const result = await searchMusic(this.term);
            runInAction(() => {
                this.playList = result.data
                this.status = 'compleated';
            })

            console.log(result.data);
        } catch (error) {
            console.log(error);
        }
    }
}

export const store = new MusicSearchStore();
