<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import ArticleContent from '@/components/ArticleContent.vue'
import AssuranceModal from '@/components/modal/AssuranceModal.vue'

export default defineComponent({
  name: 'ArticleEditor',
  components: { AssuranceModal, ArticleContent },

  props: {
    startTitle: {
      type: String,
      required: true
    },
    startContent: {
      type: Object as PropType<any>,
      required: true
    },
    saveHandler: {
      type: Object as PropType<(title: string, content: any) => Promise<void>>,
      required: true
    }
  },

  data() {
    return {
      title: this.startTitle,
      content: this.startContent,
      isLoading: false,
      isSaveModalShowing: false,
      error: null as string | null,
      errorId: 0
    }
  },

  methods: {
    inputTitle(event: any) {
      this.title = event.target.innerText
    },
    updateContent(newContent: any) {
      this.content = newContent
    },
    onCancel() {
      this.$router.back()
    },
    onSave() {
      this.showAssureModal()
    },
    onSureSave() {
      this.isLoading = true
      this.saveHandler(this.title, this.content).then(() => {
        this.$router.back()
      }).catch((e) => {
        this.error = e.toString()
        this.errorId += 1
        const currentErrorId = +this.errorId
        setTimeout(() => {
          if (this.errorId == currentErrorId) {
            this.error = null
          }
        }, 2000)
      }).finally(() => this.isLoading = false)
    },
    showAssureModal() {
      this.isSaveModalShowing = true
    }
  }
})
</script>

<template>
  <div class="bg-light">
    <div class="container d-flex justify-content-end py-2">
      <button type="button"
              class="btn btn-outline-secondary me-2"
              @click="onCancel"
              :disabled="isLoading">
        Cancel
      </button>
      <button type="button"
              class="btn btn-dark"
              @click="onSave"
              :disabled="isLoading">
        Save
      </button>
    </div>
  </div>

  <div class="container my-5">
    <div class="article-head">
      <div class="alert alert-danger" role="alert" v-if="error">
        {{ error }}
      </div>

      <div class="article-title">
        <h1 class="mb-3" @input="inputTitle" :contenteditable="!isLoading">{{ startTitle }}</h1>
      </div>
    </div>


    <ArticleContent :editable="!isLoading" :content="startContent" @update:content="updateContent" />
  </div>

  <!-- Assurance Modal for article editor -->
  <AssuranceModal title="Saving article"
                  cancel-label="Cancel"
                  sure-label="Save"
                  @assure="onSureSave"
                  v-model:showing="isSaveModalShowing">
    <p>Would you really like to save this article?</p>
  </AssuranceModal>

</template>

<style scoped>
.article-head {
  margin-left: 40px;
  margin-right: 40px;
}

.article-title h1::selection {
  background-color: #d4ecff;
}

.article-title h1[contenteditable] {
  outline: 0 solid transparent;
}
</style>
