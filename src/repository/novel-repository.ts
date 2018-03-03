import db from '../database';
import { Database } from '../database';
import Novel from '../entity/Novel';

class NovelRepository {
  private db: Database;

  constructor(database: Database) {
    this.db = database;
  }

  public getByNcode(ncode: string) {
    return this.db.novels.get(ncode);
  }

  public save(novel: Novel, now: Date = new Date()) {
    novel.cachedAt = now;
    return this.db.novels.put(novel);
  }

  public bookmark(ncode: string, now: Date = new Date()) {
    return this.db.novels
      .update(ncode, { bookmarkedAt: now });
  }

  public deleteBookmark(ncode: string) {
    return db.novels
      .update(ncode, { bookmarkedAt: new Date(0) });
  }
}

export default new NovelRepository(db);
