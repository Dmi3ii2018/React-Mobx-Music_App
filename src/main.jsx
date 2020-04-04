import React from 'react';
import './App.css';
import {Navigation} from './components/navigation/navigation';
import {Player} from './components/player/player';
import {Playlist} from './components/playlist/playlist';

export class MainPage extends React.PureComponent {
    render() {
      return (
        <div className="player">
        <div className="cover"></div>
      <Navigation />
      <Player />
      <div className="btn">
    {/* <i className="material-icons">shuffle</i> */}
      </div>
      <Playlist />
    </div>
      )
    }
}