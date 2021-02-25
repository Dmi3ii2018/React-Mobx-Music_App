import 'whatwg-fetch';

const CORS = `https://cors-anywhere.herokuapp.com/`;
const API_ENDPOINT = `${CORS}https://api.deezer.com/`;

export const searchMusic = async (term, type = 'search?q=') => {
  DZ.api(`${type}${term}&&index=0&limit=10`, function(response){
    console.log("Nam", response.data);
    return response
  });

}

const getJSONResponse = async (url) => {
    const result = await DZ.api(url, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
    });

    const data = result.json();
    return data;
}

export const getPlayList = async (url) => {
    const trackList = await DZ.api(`${url}`, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
    });
    console.log(trackList.json());

    return trackList;
}

