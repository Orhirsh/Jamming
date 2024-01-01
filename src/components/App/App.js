import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import Tracklist from '../Tracklist/Tracklist';
import Playlist from '../Playlist/Playlist';
import { useState, useEffect } from 'react';
import { getUserId, postNewPlaylist, getToken, searchSpotify } from '../http';

function App() {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [tracklist, setTracklist] = useState([]);
  const [access_token, setAccess_Token] = useState(null);




  async function searchHandler(term) {
    if (access_token === null) {
      getToken()
    }
    else {
      try {
        const results = await searchSpotify(term, access_token);
        const list = results.tracks.items.map((item) => ({
          id: item.id,
          title: item.name,
          album: item.album.name,
          artist: item.artists[0].name,
          isAdded: false,
          uri: item.uri,
        }));
        setTracklist(list)
      }
      catch (error) {
        console.log('error')
      }



      //     const list = results.tracks.items.map((item) => ({
      //       id: item.id,
      //       title: item.name,
      //       album: item.album.name,
      //       artist: item.artists[0].name,
      //       isAdded: false,
      //       uri: item.uri,
      //     }));

      //     setTracklist(list);
      //   } catch (error) {
      //     console.log('Error in search:', error);
      //  
    }
  }

  useEffect(() => {
    let timerId;

    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const tokenParams = new URLSearchParams(hash);
      const accessToken = tokenParams.get('access_token');
      const expiredIn = tokenParams.get('expires_in');
      setAccess_Token(accessToken);


      timerId = setTimeout(() => {
        setAccess_Token(null);
        console.log('time is up');
        window.location.href = 'http://localhost:3000/'
      }, expiredIn * 1000);
    }

    return () => {
      clearTimeout(timerId); // Clear the timer on component unmount
    };

  }, [access_token]);


  function handleAddTrack(addedTrack) {
    setPlaylistTracks((prev) => [addedTrack, ...prev]);
    setTracklist((prev) => prev.filter((track) => track.id !== addedTrack.id));
  }

  function handleRemove(removedTrack) {
    setPlaylistTracks((prev) => prev.filter((track) => track.id !== removedTrack.id));
    setTracklist((prev) => [removedTrack, ...prev]);
  }

  async function handleSavePlaylist(data) {
    const savedPlaylist = data;

    try {
      const userId = await getUserId(access_token);
      postNewPlaylist(userId, savedPlaylist, access_token);
      setPlaylistTracks([])
    } catch (error) {
      console.log('Error getting Id:', error);
    }
  }

  return (
    <div className='main'>
      <h1 className='header'>Ja<span className='mm'>mm</span>ing</h1>
      <SearchBar onSearch={searchHandler} accessToken={access_token} />
      <div className='results_and_newlist'>
        <Tracklist onAddTrack={handleAddTrack} tracklist={tracklist} />
        <Playlist token={access_token} onRemoveTrack={handleRemove} onSavePlaylist={handleSavePlaylist} playlist={playlistTracks} />
      </div>
    </div>
  );
}

export default App;
