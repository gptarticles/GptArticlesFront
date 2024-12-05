<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { ArticleService } from '@/service/ArticleService'
import type { Article } from '@/dto/article/Article'
import { DateFormatUtil } from '@/util/DateFormatUtil'

export default defineComponent({
  components: { LoadingSpinner },
  props: {
    id: {
      type: Object as PropType<number>
    }
  },

  data() {
    return {
      isLoading: true,
      article: undefined as Article | undefined
    }
  },

  mounted() {
    ArticleService.getInstance().getArticle(this.id!).then(article => {
      this.article = article
      this.isLoading = false;
    })
  },

  computed: {
    createdAt() {
      return DateFormatUtil.formatDate(this.article!.createdAt!)
    }
  }
})
</script>

<template>
  <main class="container my-5 d-flex justify-content-center">
    <div v-if="isLoading" class="d-flex align-items-center">
      <LoadingSpinner />
    </div>

    <div v-else class="flex-grow-1">
      <h1>{{article!.title}}</h1>
      <span class="text-muted"><b>{{article!.creatorData.username}}</b> - {{createdAt}}</span>
      <p class="mt-4">{{article!.content}}</p>
    </div>
  </main>

</template>

<style scoped>
</style>
