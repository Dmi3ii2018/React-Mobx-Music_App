import React from 'react';
import {PlayArrow} from '../play-arrow/play-arrow';


export const Song = (prop) => {
  const {song, index} = prop;
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
            <p>{artist.name ? artist.name : 'no name'}</p>
            </div>
          </div>
          <PlayArrow index={index} />
        </div>
    )
}
