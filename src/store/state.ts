import Novel from '../entity/Novel';
import Chapter from '../entity/Chapter';

export default class State {
  public searchResults: Novel[] = [];
  public novel?: Novel;
  public chapters: Chapter[] = [];
  public chapterText: string = '';
  public showProgress: boolean = false;
}
