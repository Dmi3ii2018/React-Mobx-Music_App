import React from 'react';
import {inject, observer} from 'mobx-react';

@inject('store')
@observer
 export class Navigation extends React.PureComponent {

	onChangeHandler = (evt) => {
		this.props.store.setTerm(evt.target.value);
	}

	onKeyUpHandler = event => {
		if (event.keyCode !== 13) {
				return;
		}
		this.props.store.resetCurrentSong();
		console.log('Searching');
		this.props.store.search();
};

  	render() {
    	const {store} = this.props;
  		const {term} = store;

      return (
         <nav>
         <div className="left">
           <i className="material-icons">menu</i>
           <h6>Playlist</h6>
         </div>
         <div className="right">
           <input
						 className='search__input search__input--show'
						 type='text'
						 value={term}
						 onChange={this.onChangeHandler}
						 onKeyUp={this.onKeyUpHandler}
						 />
           <i className="material-icons search">search</i>
           <i className="material-icons">queue_music</i>
         </div>
       </nav>
      )
   }
 }