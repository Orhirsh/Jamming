import React, { useState } from 'react';
import Track from '../Track/Track';
import './Playlist.css'

function Playlist({ playlist, onRemoveTrack, onSavePlaylist }) {
    const [playlistName, setPlaylistName] = useState("");
    const [errorClass, setErrorClass] = useState(false)
    const handleChange = (e) => {
        if (e.target.value.trim() !== '') {
            setErrorClass(false)
        }
        setPlaylistName(e.target.value);
    };


    const handleSavePlaylist = () => {
        if (!playlistName.trim() == '') {
            onSavePlaylist({
                name: playlistName,
                tracks: playlist.map((track) => {
                    return track.uri
                })

            });

            setPlaylistName('')
        }
        else {
            setErrorClass(true)
        }

    }





    return (
        <div className='playlist_container'>

            <div className='save_playlist'>
                <input className={errorClass ? 'input_error' : undefined} placeholder='Playlist Name' type="text" onChange={handleChange} value={playlistName} />
                {playlist.length > 0 && <button className='savebtn' onClick={handleSavePlaylist}>Save to Spotify</button>}
            </div>

            {playlist.length === 0 ? (
                <p>No track added</p>
            ) : (
                playlist.map((track) => (

                    track.isAdded &&


                    <Track key={track.id} id={track.id} title={track.title} artist={track.artist} album={track.album} isAdded={track.isAdded} onRemoveTrack={onRemoveTrack} />


                ))
            )}
        </div>
    );
}

export default Playlist;
