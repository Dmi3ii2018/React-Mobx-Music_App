import {Howl} from 'howler';

export class PlayerHandler {
    constructor(index, src) {
				this.index = index;
				this.songSrc = src;
				this.songInstance = null;
    }

    setPlayer = () => {
        const song = new Howl({
					src: [this.songSrc],
						onpause: () => console.log('paused')
				});
				this.songInstance = song;
      return song;
		}

		step = () => {
			let seek = this.songInstance.seek() || 0;
			console.log(seek);
		}
}