import React from 'react';
import './App.css';
import {Navigation} from './components/navigation/navigation';
import {Player} from './components/player/player';
import {Playlist} from './components/playlist/playlist';
import {inject, observer} from 'mobx-react';

@inject('store')
@observer
export class MainPage extends React.PureComponent {
  render() {
    const coverStyle = {
      backgroundImage: this.props.store.currentSong ? `url(${this.props.store.currentSong.album.cover_medium})` : ``,
    };

    return (
      <div className="player">
        <div className="cover" style={coverStyle}></div>
        <Navigation />
        <Player />
        <div className="btn">
        </div>
        <Playlist />
      </div>
    )
  }
}
