import React from 'react';
import {inject} from 'mobx-react';

@inject('store')
export class PlayArrow extends React.PureComponent {
    render() {
			const {store, index} = this.props;
        return (
            <div className="state">
							<i className="material-icons"
								onClick={() => store.chooseSong(index)}
							>play_arrow</i>
            </div>
        )
    }
}
