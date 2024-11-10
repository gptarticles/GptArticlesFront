import type { CreatorData } from '@/dto/CreatorData'

export type Article = {
  id: number,
  title: string,
  content: string,
  createdAt: Date,
  creatorData: CreatorData
}
