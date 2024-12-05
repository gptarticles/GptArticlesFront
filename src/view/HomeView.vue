<script lang="ts">
import { defineComponent } from 'vue'
import { ArticleService } from '@/service/ArticleService'
import ArticleList from '@/components/ArticleList.vue'


export default defineComponent({
  components: { ArticleList },
  methods: {
    async loadMore(page: number) {
      const summaries = await ArticleService.getInstance().getRecentArticleSummaries(page)
      return {
        summaries: summaries,
        hasMore: summaries.length == 20
      }
    }
  }
});

</script>

<template>
  <main class="container my-5">
    <h1 class="mb-5">Recent Articles</h1>

    <ArticleList :loadMore="loadMore" />
  </main>
</template>
