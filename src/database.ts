import Dexie from 'dexie';
import Novel from './entity/Novel';

export class Database extends Dexie {
  public novels!: Dexie.Table<Novel, string>;

  constructor(databaseName: string) {
    super(databaseName);
    this.version(1).stores({
      novels: 'ncode, title, cachedAt, bookmarkedAt',
    });
  }
}

const db = new Database('NaroReaderDatabase');

export default db;
