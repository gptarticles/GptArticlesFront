<script lang="ts">
import { defineComponent } from 'vue'
import ArticleEditor from '@/components/ArticleEditor.vue'
import { ProtectedModerationService } from '@/service/ProtectedModerationService'

export default defineComponent({
  name: 'CreateArticleView',
  components: { ArticleEditor },

  data() {
    return {
      isLoading: false,
      title: 'This is your title',
      content: {
        blocks: [
          {
            type: "paragraph",
            data: {
              text: "This is your text"
            }
          }
        ]
      } as any,
    }
  },

  methods: {
    async createArticle(title: string, content: any) : Promise<void> {
      await ProtectedModerationService.getInstance().createArticle(title, content)

    }
  }
})
</script>

<template>
  <main>
    <ArticleEditor :startTitle="title"
                   :startContent="content"
                   :saveHandler="createArticle" />
  </main>

</template>

<style scoped>

</style>
