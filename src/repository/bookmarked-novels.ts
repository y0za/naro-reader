import db from '../database';
import { Database } from '../database';
import Novel from '../entity/Novel';

class BookmarkedNovels {
  private db: Database;

  constructor(database: Database) {
    this.db = database;
  }

  public isBookmarked(ncode: string) {
    return db.bookmarkedNovels
      .where('ncode')
      .equals(ncode)
      .count()
      .then((count: number) => {
        return count === 1;
      });
  }

  public bookmark(novel: Novel) {
    return db.bookmarkedNovels
      .put(novel);
  }

  public deleteBookmark(ncode: string) {
    return db.bookmarkedNovels
      .delete(ncode);
  }
}

export default new BookmarkedNovels(db);
