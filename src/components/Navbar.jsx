import React from 'react';
import logo from './meme.png';

export default function Navbar() {
    return (
        <>
            <div class="background-container"></div>
            <nav>
                <img id="logo" src={logo} alt='troll-face' />
                <h2 id="heading">Meme Maker Madness</h2>
            </nav>

        </>

    )
}