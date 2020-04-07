import React from 'react';
import {PlayArrow} from '../play-arrow/play-arrow';
import {inject, observer} from 'mobx-react';

@inject('store')
@observer
export class Song extends React.PureComponent {
  artistNameHandler(term) {
    this.props.store.resetCurrentSong();
    this.props.store.search(term);
  }

  render () {
    const {song, index, store} = this.props;
    const {title, artist} = song;
    return (
      <div className="song">
        <div className="info">
          <img
            className="img second"
            alt={title}
            src={song.album.cover_small}
            width="60"
            height="60"
          />
          <div className="titles">
          <h5>{title ? title : 'no title'}</h5>
          <p className="artist-name" onClick={(evt) => this.artistNameHandler(evt.target.innerText)}>{artist.name ? artist.name : 'no name'}</p>
          </div>
        </div>
        <PlayArrow index={index} />
      </div>
    )
  }
}
