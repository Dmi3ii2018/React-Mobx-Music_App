import React from 'react';
import {PlayArrow} from '../play-arrow/play-arrow';


export const Song = (prop) => {
  const {song} = prop;
  const {title, artist} = song;
    return (
        <div className="song">
          <div className="info">
            <div className="img second"></div>
            <div className="titles">
            <h5>{title ? title : 'no title'}</h5>
            <p>{artist.name ? artist.name : 'no name'}</p>
            </div>
          </div>
          <PlayArrow />
        </div>
    )
}
