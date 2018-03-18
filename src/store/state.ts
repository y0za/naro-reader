import Novel from '../entity/Novel';
import Chapter from '../entity/Chapter';
import AlertState from './module/alert-state';

export default class State {
  public searchResults: Novel[] = [];
  public novel?: Novel;
  public chapters: Chapter[] = [];
  public chapterText: string = '';
  public showProgress: boolean = false;
  public alert!: AlertState;
}
