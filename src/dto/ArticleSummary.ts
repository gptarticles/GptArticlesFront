import type { CreatorData } from '@/dto/CreatorData'

export type ArticleSummary = {
  id: number,
  title: string,
  createdAt: Date,
  creatorData: CreatorData
}
