const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const API_URL = 'https://api.syosetu.com/novelapi/api/';

export interface TitleInfo {
  ncode: number;
  title: string;
  writer: string;
  genre: number;
  general_lastup: string;
  general_all_no: number;
}

export function searchTitle(word: string) {
  const apiUrl = API_URL + '?out=json&word=' + encodeURIComponent(word);
  const url = PROXY_URL + apiUrl;
  const init = {
    method: 'GET',
    mode: 'cors',
  } as RequestInit;
  return fetch(url, init).then((response) => {
    return response.json();
  }).then((data) => {
    // first item is count info and it's unnecessary
    return data.slice(1) as TitleInfo[];
  });
}
