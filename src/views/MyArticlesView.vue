<script lang="ts">

import { defineComponent } from 'vue'
import ArticleList from '@/components/ArticleList.vue'
import { ProtectedArticleService } from '@/service/ProtectedArticleService'

export default defineComponent({
  components: { ArticleList },
  methods: {
    async loadMore(page: number) {
      const summaries = await ProtectedArticleService.getInstance().getUserArticleSummaries(page)
      return {
        summaries: summaries,
        hasMore: summaries.length == 20
      }
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
                class="btn btn-dark">Create new article</button>
      </div>
    </div>

    <ArticleList :loadMore="loadMore" />
  </main>
</template>

<style scoped>

</style>
