import type { ArticleSummary } from '@/dto/article/ArticleSummary'
import type { Article } from '@/dto/article/Article'

const fakeContent = "Former Apple engineer Alex Ruber and former Twitter and Asana engineer Parth Chopra first" +
  " met on Y Combinator’s founder match platform, then met in person at a thrift store for shopping. They later went" +
  " on a thrift store shopping trip where they talked about solving problems with finding the right product in the" +
  " online space.\n" +
  "\n" +
  "Many consumers struggle to find the right item without spending hours on Instagram. To address this, the duo is" +
  " building the search engine Encore, which lets users search for secondhand items from different sources. The" +
  " startup is currently part of Y Combinator’s first-ever fall batch.\n" +
  "\n" +
  "“The entire secondhand shopping market is really fragmented. There are hundreds of resources out there, " +
  "such as Depop, Mercari, ThredUp, eBay, Craigslist, and more. It’s hard for consumers to sift through them all to " +
  "try and get to the product you are looking for. So we wanted to remove that friction for users,” Ruber said on " +
  "a call with TechCrunch."
export class ArticleService {
  private static readonly instance = new ArticleService();

  public static getInstance() : ArticleService {
    return this.instance;
  }


  public async getRecentArticleSummaries(page: number) : Promise<ArticleSummary[]> {
    // TODO replace to real endpoint
    if (page > 3) {
      return [];
    }

    const generateArticle = (id: number) => ({
      id: id,
      title: "Encore is an AI-powered search engine for your thrifting needs",
      creatorData: {
        username: "Ivan Mehta"
      },
      createdAt: new Date()
    });

    const array = <ArticleSummary[]>[];
    for (let i = 0;  i < 20; i++) {
      array.push(generateArticle((page - 1) * 20 + (i + 1)))
    }
    return array;
  }

  public async getArticle(id: number) : Promise<Article> {
    // TODO replace to real endpoint
    return {
      id: id,
      title: "Encore is an AI-powered search engine for your thrifting needs",
      creatorData: {
        username: "Ivan Mehta"
      },
      content: fakeContent,
      createdAt: new Date()
    }
  }
}
