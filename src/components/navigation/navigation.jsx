import React from 'react';
import {inject, observer} from 'mobx-react';
import cn from 'classnames';

@inject('store')
@observer
 export class Navigation extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			isSearchVisible: false,
		}
	}

	onChangeHandler = (evt) => {
		this.props.store.setTerm(evt.target.value);
	}

	search = () => {
		this.setState({isSearchVisible: false})
		this.props.store.resetCurrentSong();
		console.log('Searching');
		this.props.store.search();
	}

	onKeyUpHandler = (event) => {
		if (event.keyCode !== 13) {
				return;
		}
		this.search();
	};

	searchButtonHandler = () => {
		const {isSearchVisible} = this.state;
		if(isSearchVisible) {
			this.search();
		} else {
			this.setState({isSearchVisible: true});
		}
	}

  	render() {
    	const {store} = this.props;
			const {term} = store;

		const searchClass = cn({
			search__input: true,
			"search__input--hide": !this.state.isSearchVisible && store.status === 'compleated',
		})

      return (
         <nav>
         <div className="left">
         </div>
         <div className="right">
           <input
						 className={searchClass}
						 type='text'
						 value={term}
						 onChange={this.onChangeHandler}
						 onKeyUp={this.onKeyUpHandler}
						 disabled={store.status === 'pending'}
						/>
           <i
					 	 className="material-icons search"
						 onClick={() => this.searchButtonHandler()}
						>search</i>
         </div>
       </nav>
      )
   }
 }