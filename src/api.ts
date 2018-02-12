import fecha from 'fecha';
import NovelInfo from './entities/NovelInfo';
import Chapter from './entities/Chapter';

const PROXY_URL = 'https://galvanize-cors-proxy.herokuapp.com/';
const API_URL = 'https://api.syosetu.com/novelapi/api/';
const NARO_URL = 'https://ncode.syosetu.com/';

export function searchNovel(word: string) {
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
    return data.slice(1) as NovelInfo[];
  });
}

export function fetchChapters(ncode: string) {
  const naroUrl = NARO_URL + ncode + '/';
  const url = PROXY_URL + naroUrl;
  const init = {
    method: 'GET',
    mode: 'cors',
  } as RequestInit;
  return fetch(url, init).then((response) => {
    return response.text();
  }).then((text) => {
    return extractChaptersFromHTML(text);
  });
}

function extractChaptersFromHTML(html: string): Chapter[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const chapterBlocks = doc.querySelectorAll('.novel_sublist li, .novel_sublist2');
  const elements = Array.from(chapterBlocks) as HTMLElement[];

  const chapters: Chapter[] = [];
  for (const element of elements) {
    const anchor = element.querySelector('a');
    const dateElement = element.querySelector('.long_update, .kaikou') as HTMLElement;
    if (anchor == null || dateElement == null) {
      continue;
    }

    const dateText = dateElement.textContent!.split(/\r?\n/)[1];
    chapters.push({
      id: anchor.href.match(/\/(\w+)\/$/)![1] || '',
      title: anchor!.textContent || '',
      postedDate: fecha.parse(dateText, 'YYYY/MM/DD HH:mm'),
    } as Chapter);
  }
  return chapters;
}

export function fetchChapterText(ncode: string, id: string) {
  const chapterUrl = NARO_URL + '/' + ncode + '/' + id + '/';
  const url = PROXY_URL + chapterUrl;
  const init = {
    method: 'GET',
    mode: 'cors',
  } as RequestInit;
  return fetch(url, init).then((response) => {
    return response.text();
  }).then((text) => {
    return extractChapterTextFromHTML(text);
  });
}

function extractChapterTextFromHTML(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const element = doc.getElementById('novel_honbun') as HTMLElement;
  return element.innerHTML;
}
