import React from 'react';
import {Song} from '../song/song';
import {inject, observer} from 'mobx-react';
import { LinearProgress } from '@material-ui/core';

@inject('store')
@observer
 export class Playlist extends React.PureComponent {
   render() {
    const {isEmpty, playList, status} = this.props.store;
    console.log(isEmpty, playList, status);
    return (
       <div className='music'>
         {isEmpty && status === 'pending' ?
           <LinearProgress variant={'query'} /> : null
         }
        {isEmpty && status === 'compleated' ?
          <p className="result">No results found</p> : null
        }
         {playList.map((song, i) => {
            if (i > 0) {
              return <Song key={song.id} index={i} song={song} />
            }
              return null;
            })
          }
       {/* <audio crossOrigin="anonymous" src='https://cors-anywhere.herokuapp.com/https://cdns-preview-3.dzcdn.net/stream/c-30ac211e4edea6b6ac3149bcbd5cdb5b-2.mp3'  controls>Audio is not supported</audio> */}
     </div>
    )
   }
 }
