import React from 'react';
import { exportComponentAsJPEG } from 'react-component-export-image'
import image from './download.svg'

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/3po4m7.jpg"
    });

    const [allMemes, setAllMemes] = React.useState([]);

    const memeReference = React.createRef();

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])


    function getMemeImage() {
        const randomIndex = Math.floor(Math.random() * allMemes.length);
        const url = allMemes[randomIndex].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url

        }
        ));
    }

    function handleChange(event) {
        const { name, value } = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))

    }


    return (
        <main>
            <div className='app-container'>
            <div className='form'>
                <input
                    className='search-meme'
                    type="text"
                    placeholder='Top text'
                    name='topText'
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    className='search-meme'
                    type="text"
                    placeholder='Bottom text'
                    name='bottomText'
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button
                    id="submit"
                    type='submit'
                    onClick={getMemeImage}
                >
                    Get new meme 🖼
                </button>
            </div>
            <div className='memeDisplay'>
                <div ref={memeReference} className='Meme-Text-Image'>
                    <img className='memeImage' src={meme.randomImage} alt="Meme" />
                    <h2 className='meme-text top' >{meme.topText}</h2>
                    <h2 className='meme-text bottom'> {meme.bottomText}</h2>
                </div>
                <button
                    className='save-btn'
                    onClick={() => exportComponentAsJPEG(memeReference)}
                >
                    <img src={image} alt='download'></img>
                </button>
            </div>
            </div>
        </main>
    )
}
