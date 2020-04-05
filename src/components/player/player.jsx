import React from 'react';
import {inject, observer} from 'mobx-react';
// import {Howl, Howler} from 'howler';
import { reaction } from 'mobx';

const Music = {
  NEXT: 'next',
  PREV: 'prev',
}

@inject('store')
@observer
export class  Player extends React.PureComponent {
  cancelMusicChange = null;

  constructor(props) {
    super(props);
    this._playButtonRef = React.createRef();
    this.state = {
      isPlaying: false,
    }
    this.songId = null;
    this.trackMusicAvailability();
  }

  trackMusicAvailability() {
    this.cancelMusicChange = reaction(() => {
      return this.props.store.currentSong
    },
      (curSong) => {
        console.log(curSong);
        // this.props.store.setCurrentSong(this.props.store.playList[this.props.store.currentSongIndex].id);
        this.props.store.setMusicInstance();
        this.props.store.songInstance.on('end', () => {
          console.log('end of song listener');
          this.musicChangeHandler(Music.NEXT);
      })
      }
    )
  }

  playButtonHandler = () => {
    this.props.store.songInstance.play();
    this.setState(() => ({
    isPlaying: true,
  }))
  }

  pauseButtonHandler = () => {
    this.props.store.songInstance.pause();
    this.setState(() => ({
    isPlaying: false,
  }))
  }

  musicChangeHandler = (term) => {
    let index = this.props.store.currentSongIndex;
    switch(term) {
      case Music.NEXT:
        index = this.props.store.currentSongIndex + 1;
        break;
      case Music.PREV:
        index = this.props.store.currentSongIndex - 1;
        break;
      default: index;
    }

    if(index < 0 || index >= this.props.store.playList.length) {
      return;
    }
    this.props.store.songInstance.stop();

    this.props.store.setCurrentSongIndex(index);
    this.props.store.setCurrentSong(index, null);
    this.props.store.songInstance.play();
    this.setState({isPlaying: true});
  }

  render() {
    const {isPlaying} = this.state;
    const promoSong = this.props.store.currentSong;
    const {currentSongIndex, playList} = this.props.store;
    // console.log(this.props.store.playList);

    return (
      <div className="player-ui">
        <div className="title">
        <h3>{promoSong ? promoSong.title : ``}</h3>
        </div>
        <div className="small">
          <i className="material-icons">replay</i>
          <p>{promoSong ? promoSong.artist.name : ``}</p>
          <i className="material-icons">volume_up</i>
        </div>
        <div className="progress">
          <div className="played">
            <div className="circle"></div>
          </div>
        </div>
        <div className="controls">
          <i
            className="material-icons"
            onClick={() => this.musicChangeHandler(Music.PREV)}
            >skip_previous</i>
          {isPlaying
            ? <i className="material-icons"
              onClick={this.pauseButtonHandler}
            >pause</i>
            : <i className="material-icons"
            ref={this._playButtonRef}
            onClick={this.playButtonHandler}
            >play_arrow</i>
        }
          <i
            className={currentSongIndex !== playList.length - 1 ? 'material-icons' : 'material-icons material-icons__disable'}
            onClick={() => this.musicChangeHandler(Music.NEXT)}
          >
            skip_next</i>
        </div>
      </div>
    )
  }
}
