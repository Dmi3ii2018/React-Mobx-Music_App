import React from 'react';

export const  Player = () => {
    return (
      <div className="player-ui">
        <div className="title">
          <h3>Hello</h3>
        </div>
        <div className="small">
          <i className="material-icons">replay</i>
          <p>Adele</p>
          <i className="material-icons">volume_up</i>
        </div>
        <div className="progress">
          <div className="played">
            <div className="circle"></div>
          </div>
        </div>
        <div className="controls">
          <i className="material-icons">skip_previous</i>
          <i className="material-icons">play_arrow</i>
          <i className="material-icons">skip_next</i>
        </div>
      </div>
    )
}
