export function getToken() {
    const CLIENT_ID = '1d18d684db2b4199848e5a01440779b8'
    const SPOTIFY_AUTHO = 'https://accounts.spotify.com/authorize/'
    const REDIRECT_URI = 'http://localhost:3000/'


    const url = `${SPOTIFY_AUTHO}?response_type=token&client_id=${CLIENT_ID}&scope=playlist-modify-private&redirect_uri=${REDIRECT_URI}&show_dialog=true`;
    window.location.href = url;

}

export async function searchSpotify(searchTerm, token) {
    const END_POINT = 'https://api.spotify.com/v1/search?'
    const q = `q=${searchTerm}`
    const response = await fetch(`${END_POINT}${q}&type=artist%2Calbum%2Ctrack&limit=10`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`

        }

    })

    const responseJson = await response.json();


    return responseJson;
}
export async function getUserId(token) {
    try {
        const response = await fetch('https://api.spotify.com/v1/me',
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseJson = await response.json()
        return responseJson.id


    }
    catch (error) {
        console.log('error')
    }

}
export async function postNewPlaylist(id, playlist, token) {

    const userId = id;
    const accessToken = token;

    const apiUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    };

    const playlistData = {
        name: playlist.name,
        description: 'new playlist',
        public: false

    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(playlistData)
        });


        if (!response.ok) {
            // Handle non-successful responses
            throw new Error(`Failed to create playlist: ${response.status} - ${response.statusText}`);
        }



        const newPlaylist = await response.json();
        const playlistId = newPlaylist.id;
        const ADD_ITEM_ENDPOINT = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
        const addedTracks = playlist.tracks;
        console.log()


        const post = await fetch(ADD_ITEM_ENDPOINT, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                uris: addedTracks,
                position: 0


            })


        })
        if (!post.ok) {
            throw new Error('Failed to add items')
        }
    } catch (error) {
        console.error('Error creating playlist:', error);
    }
}
