import type { ArticleCreatorData } from '@/dto/article/ArticleCreatorData'

export type Article = {
  id: number,
  title: string,
  content: string,
  createdAt: Date,
  creatorData: ArticleCreatorData
}
