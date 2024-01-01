import React, { useState } from 'react';
import Card from '../UI/Card';
import './Track.css';

function Track(props) {

    const handleAddTrack = () => {
        props.onAddTrack({
            id: props.id,
            title: props.title,
            album: props.album,
            artist: props.artist,
            isAdded: true,
            uri: props.uri
        })
    }
    const handleRemove = () => {
        props.onRemoveTrack({
            id: props.id,
            title: props.title,
            album: props.album,
            artist: props.artist,
            isAdded: false,
            uri: props.uri
        })
    }


    return (

        <Card className='Track'>
            <div className='Track-information'>
                <h3>{props.title}</h3>
                <p>{props.artist} | {props.album}</p>
            </div>
            <div>
                {props.isAdded && <button className='sign' onClick={handleRemove}>-</button>}
                {!props.isAdded && <button className='sign' onClick={handleAddTrack}>+</button>}
            </div>
        </Card>

    );
}

export default Track;
