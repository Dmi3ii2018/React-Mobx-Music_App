import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import * as serviceWorker from './serviceWorker';
import {MainPage} from './main';
import {Provider} from 'mobx-react';
import {store} from './store/store';


ReactDOM.render(
    <Provider store={store}>
        <MainPage />
    </Provider>,
    document.getElementById('root')
     );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
