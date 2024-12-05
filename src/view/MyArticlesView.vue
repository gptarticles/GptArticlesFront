<script lang="ts">

import { defineComponent } from 'vue'
import ArticleList from '@/components/ArticleList.vue'
import { ProtectedArticleService } from '@/service/ProtectedArticleService'
import { ProtectedModerationService } from '@/service/ProtectedModerationService'

export default defineComponent({
  components: { ArticleList },
  methods: {
    async loadMoreModeratingArticles(page: number) {
      const summaries = await ProtectedModerationService.getInstance().getUserArticleSummaries(page)
      return {
        summaries: summaries,
        hasMore: summaries.length == 20
      }
    },
    async loadMorePublishArticles(page: number) {
      const summaries = await ProtectedArticleService.getInstance().getUserArticleSummaries(page)
      return {
        summaries: summaries,
        hasMore: summaries.length == 20
      }
    },
    openCreateArticlePage() {
      this.$router.push({name: 'create-article'});
    }
  }
})
</script>

<template>
  <main class="container my-5">
    <div class="d-flex mb-5">
      <h1>My Articles</h1>
      <div class="ms-auto align-content-center">
        <button type="button"
                class="btn btn-dark"
                @click="openCreateArticlePage">Create new article</button>
      </div>
    </div>

    <h2 class="mb-3">On moderation</h2>
    <ArticleList type="moderating" :loadMore="loadMoreModeratingArticles" />

    <h2 class="mb-3">Published</h2>
    <ArticleList :loadMore="loadMorePublishArticles" />
  </main>
</template>

<style scoped>

</style>
