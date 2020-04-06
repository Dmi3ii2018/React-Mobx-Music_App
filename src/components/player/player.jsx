import React from 'react';
import {inject, observer} from 'mobx-react';
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
      isMuted: true,
    }
    this.songId = null;
    this.trackMusicAvailability();
    this.progressRef = React.createRef();
  }

  trackMusicAvailability() {
    this.cancelMusicChange = reaction(() => {
      return this.props.store.currentSong
    },
      (curSong) => {
        const {store} = this.props;
        this.progressRef.current.style.width = `0%`;

        store.setMusicInstance();
        if(store.isChoosen) {
          this.playButtonHandler();
        }

        store.songInstance.on('play', () => {
          console.log('playing');
          requestAnimationFrame(this.step);
        })

        store.songInstance.on('end', () => {
          console.log('end of song listener');
          this.musicChangeHandler(Music.NEXT);
        })
      }
    );
    reaction(() => {
      return this.props.store.playList;
    },
    () => {
      if(this.props.store.songInstance) {
        this.props.store.songInstance.stop();
      }
      this.setState(() => ({
        isPlaying: false,
      }));
    }
    )
  }

  step = () => {
    const song = this.props.store.songInstance;

    if (song && song.playing()) {
      let seek = song.seek();
      this.progressRef.current.style.width = (((seek / song.duration()) * 100) || 0) + '%';
      requestAnimationFrame(this.step);
    }
  }

  changeProgressBar = () => {
    this.props.store.songInstance
  }

  playButtonHandler = () => {
    console.log(this.props.store.songInstance.duration());
    setTimeout(() => {
    }, 3000);
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

  muteButtonHandler = () => {
    this.setState((state) => ({
      isMuted: !state.isMuted,
    }))
    this.props.store.songInstance.mute(this.state.isMuted);
  }

  resetButtonHandler = () => {
    if(this.props.store.songInstance.playing()) {
      this.props.store.songInstance.seek(0);
    }
  }

  seekHandler = (per) => {
    const song = this.props.store.songInstance;
    if(song.playing()) {
      song.seek(song.duration() * per);
    }
  }

  render() {
    const {isPlaying} = this.state;
    const promoSong = this.props.store.currentSong;
    const {currentSongIndex, playList} = this.props.store;
    // console.log(this.props.store.playList);

    return (
      <div className="player-ui">
        <div className="title">
        <h3 className="promo-title">{promoSong ? promoSong.title : ``}</h3>
        </div>
        <div className="small">
          <i className="material-icons"
            onClick={() => this.resetButtonHandler()}
          >replay</i>
          <p>{promoSong ? promoSong.artist.name : ``}</p>
          <i
            className="material-icons"
            onClick={() => this.muteButtonHandler()}
          >volume_up</i>
        </div>
        <div className="progress" onClick={(evt) => this.seekHandler(evt.clientX / window.innerWidth)}>
          <div className="played"
            ref={this.progressRef}
            onClick={(evt) => console.log(evt)}
          >
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

  componentWillUnmount() {
    this.cancelMusicChange();
  }
}
