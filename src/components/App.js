import React from 'react'
import Chat from './Chat';
import '../styles/App.css'
import Menu from './Menu';
import Player from './Player';

const App = () => {
    return (
        <div id='container'>
            <Player />
            <Chat />
            <Menu />
        </div>
    );
};

export default App;