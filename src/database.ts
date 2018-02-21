import Dexie from 'dexie';
import Novel from './entity/Novel';

export class Database extends Dexie {
  public bookmarkedNovels!: Dexie.Table<Novel, string>;

  constructor(databaseName: string) {
    super(databaseName);
    this.version(1).stores({
      bookmarkedNovels: 'ncode, title',
    });
  }
}

const db = new Database('NaroReaderDatabase');

export default db;
