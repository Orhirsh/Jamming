// Tracklist.js

import React from 'react';
import Track from '../Track/Track';
import './Tracklist.css';
import '../Playlist/Playlist.css'

function Tracklist({ tracklist, onAddTrack, }) {
    return (
        <div className='playlist_container'>
            <h2>Results</h2>
            {tracklist.length === 0 && <p>No tracks to display</p>}
            {tracklist.map((track) => (
                !track.isAdded && (
                    <Track
                        key={track.id}
                        id={track.id}
                        title={track.title}
                        artist={track.artist}
                        album={track.album}
                        isAdded={track.isAdded}
                        onAddTrack={onAddTrack}
                        uri={track.uri}


                    />
                )
            ))}
        </div>
    );
}

export default Tracklist;
