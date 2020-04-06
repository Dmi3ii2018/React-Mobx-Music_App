import React from 'react';
import {inject, observer} from 'mobx-react';
import cn from 'classnames';

@inject('store')
@observer
export class PlayArrow extends React.PureComponent {
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
							onClick={() => store.chooseSong(index)}
						>play_arrow</i>
					</div>
        )
    }
}
