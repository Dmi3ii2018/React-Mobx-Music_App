import React from 'react';
import {inject, observer} from 'mobx-react';
import cn from 'classnames';

@inject('store')
@observer
export class PlayArrow extends React.PureComponent {
  constructor() {
    super();
    this.state = {isPlaying: false};
  }

  playButtonHandler = () => {
      const {store, index} = this.props;
      store.chooseSong(index);

    if(store.songInstance.playing() && store.currentSongIndex === index) {
      store.songInstance.pause();
      store.setSongPlayingStatus(false);
    } else {
      store.songInstance.play();
      store.setSongPlayingStatus(true);
    }
  }

    render() {
      const {store, index} = this.props;

			const playButtonClass = cn({
				'material-icons': true,
				'play-button': true,
				'red600': store.currentSongIndex === index,
			})

        return (
					<div className="state">
						<i className={playButtonClass}
							onClick={() => this.playButtonHandler()}
            >{
              store.currentSongIndex === index && store.isPlaying
                ? `pause`
                : `play_arrow`}
            </i>
					</div>
        )
    }
}
