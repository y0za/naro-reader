const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const API_URL = 'https://api.syosetu.com/novelapi/api/';
const NARO_URL = 'http://ncode.syosetu.com/';

export interface TitleInfo {
  ncode: string;
  title: string;
  writer: string;
  genre: number;
  general_lastup: string;
  general_all_no: number;
}

export interface Episode {
  id: string;
  title: string;
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

export function fetchEpisodes(ncode: string) {
  const naroUrl = NARO_URL + '/' + ncode + '/';
  const url = PROXY_URL + naroUrl;
  const init = {
    method: 'GET',
    mode: 'cors',
  } as RequestInit;
  return fetch(url, init).then((response) => {
    return response.text();
  }).then((text) => {
    return extractEpisodesFromHTML(text);
  });
}

function extractEpisodesFromHTML(html: string): Episode[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const elements = doc.querySelectorAll('.novel_sublist2 a');
  const links = Array.from(elements) as HTMLLinkElement[];
  return links.map((link) => {
    return {
      id: link.href.match(/\/(\w+)\/$/)![1] || '',
      title: link.textContent || '',
    } as Episode;
  });
}
