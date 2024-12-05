import type { ArticleSummary } from '@/dto/article/ArticleSummary'

export class ProtectedModerationService {
  private static readonly instance = new ProtectedModerationService();

  public static getInstance() : ProtectedModerationService {
    return this.instance;
  }

  public async getUserArticleSummaries(page: number) : Promise<ArticleSummary[]> {
    // TODO
    return []
  }

  public async createArticle(title: string, content: any) : Promise<void> {
    console.log('New article is trying to be created')
    console.log(title)
    console.log(JSON.stringify(content))
    // TODO
  }
}
