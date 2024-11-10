<script lang="ts">
import { defineComponent } from 'vue'
import { ArticleService } from '@/service/ArticleService'
import type { ArticleSummary } from '@/dto/ArticleSummary'
import ArticleCard from '@/components/ArticleCard.vue'


export default defineComponent({
  components: { ArticleCard },
  data() {
    return {
      isLoading: false,
      currentPage: 1,
      summaries: <ArticleSummary[]>[]
    }
  },

  mounted() {
    this.appendArticleSummaries();
  },

  methods: {
    appendArticleSummaries() {
      this.isLoading = true;
      ArticleService.getInstance().getRecentArticleSummaries(this.currentPage).then(newSummaries => {
        this.summaries.push(...newSummaries);
        this.currentPage += 1;
        this.isLoading = false;
      });
    }
  }
});

</script>

<template>
  <main class="container my-5">
    <h1 class="mb-5">Recent Articles</h1>

    <div class="d-grid gap-3">
      <ArticleCard v-for="summary in summaries" :summary="summary" />
    </div>

  </main>
</template>
