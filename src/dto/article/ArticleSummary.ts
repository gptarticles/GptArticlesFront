import type { ArticleCreatorData } from '@/dto/article/ArticleCreatorData'

export type ArticleSummary = {
  id: number,
  title: string,
  createdAt: Date,
  creatorData: ArticleCreatorData
}
