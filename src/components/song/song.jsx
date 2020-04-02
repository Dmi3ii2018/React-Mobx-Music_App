import React from 'react';
import {PlayArrow} from '../play-arrow/play-arrow';


export const Song = () => {
    return (
        <div className="song-1">
          <div className="info">
            <div className="img second"></div>
            <div className="titles">
              <h5>Hello</h5>
              <p>Adele</p>
            </div>
          </div>
          <PlayArrow />
        </div>
    )
}
