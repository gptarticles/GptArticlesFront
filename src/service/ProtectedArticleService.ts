export class ProtectedArticleService {
  private static readonly instance = new ProtectedArticleService();

  public static getInstance() : ProtectedArticleService {
    return this.instance;
  }


  async getUserArticleSummaries(page: number) {
    return []
  }
}
