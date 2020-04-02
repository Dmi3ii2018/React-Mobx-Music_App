import React from 'react'

 export const Navigation = () => {
     return (
        <nav>
        <div className="left">
          <i className="material-icons">menu</i>
          <h6>Playlist</h6>
        </div>
        <div className="right">
          <i className="material-icons search">search</i>
          <i className="material-icons">queue_music</i>
        </div>
      </nav>
     )
 }