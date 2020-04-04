import 'whatwg-fetch';

const CORS = `https://cors-anywhere.herokuapp.com/`;
const API_ENDPOINT = `${CORS}https://api.deezer.com/search?q=`;

export const searchMusic = async (term) => {
    const result = await getJSONResponse(`${API_ENDPOINT}${term}&&index=0&limit=10`);
    return result;
}

const getJSONResponse = async (url) => {
    const result = await fetch(url, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
    });

    const data = result.json();

    return data;
}

export const getPlayList = async (url) => {
    const trackList = await fetch(`${CORS}${url}`, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
    });
    console.log(trackList.json());

    return trackList;
}