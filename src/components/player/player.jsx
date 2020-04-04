import React from 'react';
import {inject, observer} from 'mobx-react';
import {Howl, Howler} from 'howler';
import { reaction } from 'mobx';

@inject('store')
@observer
export class  Player extends React.PureComponent {
  cancelMusicChange = null;

  constructor(props) {
    super(props);
    this._playButtonRef = React.createRef();
    this.state = {
      currentSongSrc: ``,
    }
    this.song = null;
    // this.trackMusicChange();
  }

  componentDidUpdate() {
    if(this.song) {
      this.song = null;
    }

    if(this.props.store.status === 'compleated') {
      this.song = new Howl({
        src: [this.props.store.playList[0].preview],
      });
    }
  }

  playButtonHandler = () => {
    this.song.play();
  }

  render() {
    const {playList} = this.props.store;
    const promoSong = this.props.store.playList[0];
    console.log(this.state);

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
          <i className="material-icons">skip_previous</i>
          <i className="material-icons"
            ref={this._playButtonRef}
            onClick={this.playButtonHandler}
          >play_arrow</i>
          {/* <span className="material-icons">pause</span> */}
          <i className="material-icons">skip_next</i>
        </div>
      </div>
    )
  }
}
