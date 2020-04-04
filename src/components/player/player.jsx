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
    this.trackMusicChange();
  }

  trackMusicChange() {
    if(this.cancelMusicChange) {
      this.cancelMusicChange();
    }
    this.cancelMusicChange = reaction(
      () => this.props.store.playList,
      (data) => this.setState(() => ({
        currentSongSrc: data[0].preview,
      }))
    )
  }

  componentDidMount() {
    var sound = new Howl({
      src: this.state.currentSongSrc ? [this.state.currentSongSrc] : [""],
    });

    sound.src ? sound.play() : null;
    console.log('hw')
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
          <i className="material-icons" ref={this._playButtonRef}>play_arrow</i>
          {/* <span className="material-icons">pause</span> */}
          <i className="material-icons">skip_next</i>
        </div>
      </div>
    )
  }
}
