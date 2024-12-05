<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { ArticleSummary } from '@/dto/article/ArticleSummary'
import { DateFormatUtil } from '@/util/DateFormatUtil'
import type { ArticleType } from '@/type/ArticleType'

export default defineComponent({
  props: {
    summary: {
      type: Object as PropType<ArticleSummary>,
      default: false
    },
    type: {
      type: Object as PropType<ArticleType>,
      default: "published"
    }
  },
  computed: {
    createdAt() {
      return DateFormatUtil.formatDate(this.summary.createdAt)
    },
    routerLinkDestination() {
      switch (this.type) {
        case 'published':
          return {name: 'article', params: {id: this.summary.id}}
        case 'moderating':
          return {}
      }
    }
  }
});
</script>

<template>
  <RouterLink :to="routerLinkDestination">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{summary.title}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{summary.creatorData.username}} - {{createdAt}}</h6>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
a {
  text-decoration: none;
}
a:hover .card {
  background-color: #f1f1f1;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}
</style>
