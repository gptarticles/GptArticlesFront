<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import ArticleListItem from '@/components/ArticleListItem.vue'
import type { ArticleSummary } from '@/dto/article/ArticleSummary'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

type ArticleSummaryLoader = (page: number) => Promise<{summaries: ArticleSummary[], hasMore: boolean}>;

export default defineComponent({
  name: 'ArticleList',
  components: { LoadingSpinner, ArticleListItem },

  props: {
    loadMore: {
      type: Object as PropType<ArticleSummaryLoader>,
      required: true
    }
  },

  data() {
    return {
      isLoading: false,
      hasMore: false,
      nextPage: 1,
      summaries: <ArticleSummary[]>[]
    }
  },

  mounted() {
    this.appendArticleSummaries();
  },

  methods: {
    appendArticleSummaries() {
      this.hasMore = false;
      this.isLoading = true;
      this.loadMore(this.nextPage).then(newSummaryData => {
        this.summaries.push(...newSummaryData.summaries);
        this.nextPage += 1;
        this.isLoading = false;
        this.hasMore = newSummaryData.hasMore
      });
    }
  }
})
</script>

<template>
  <div class="d-grid gap-3">
    <ArticleListItem v-for="summary in summaries" :summary="summary" />
    <p v-if="summaries.length == 0 && !isLoading">There is no any articles</p>
    <div class="d-flex justify-content-center mt-2">
      <LoadingSpinner v-if="isLoading" />
      <button v-if="hasMore"
              @click="appendArticleSummaries"
              type="button"
              class="btn btn-dark">Load more</button>
    </div>
  </div>
</template>

<style scoped>

</style>
