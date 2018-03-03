declare var NARO_BASE_URL: string;

import fetchJsonp from 'fetch-jsonp';
import fecha from 'fecha';
import Novel from './entity/Novel';
import Chapter from './entity/Chapter';

const API_BASE_URL = 'https://api.syosetu.com/novelapi/api/';

export function searchNovel(word: string) {
  const url = API_BASE_URL + '?out=jsonp&title=1&word=' + encodeURIComponent(word);
  return fetchJsonp(url).then((response) => {
    return response.json();
  }).then((data) => {
    // first item is count info and it's unnecessary
    return data.slice(1).map((item: any) => {
      return {
        ncode: item.ncode.toLowerCase(),
        title: item.title,
        writerName: item.writer,
        cachedAt: new Date(0),
        bookmarkedAt: new Date(0),
      } as Novel;
    });
  });
}

export function fetchNovelAndChapters(ncode: string) {
  const url = NARO_BASE_URL + ncode + '/';
  const init = {
    method: 'GET',
    mode: 'cors',
  } as RequestInit;
  return fetch(url, init).then((response) => {
    return response.text();
  }).then((text) => {
    return extractNovelAndChaptersFromHTML(text, ncode);
  });
}

function extractNovelAndChaptersFromHTML(html: string, ncode: string): [Novel, Chapter[]] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const novelTitleElement = doc.querySelector('.novel_title') as HTMLElement;
  const writerLink = doc.querySelector('.novel_writername a') as HTMLLinkElement;
  const novel = {
    ncode,
    title: novelTitleElement.textContent,
    writerName: writerLink.textContent,
    cachedAt: new Date(0),
    bookmarkedAt: new Date(0),
  } as Novel;

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
  return [novel, chapters];
}

export function fetchChapterText(ncode: string, id: string) {
  const url = NARO_BASE_URL + '/' + ncode + '/' + id + '/';
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
