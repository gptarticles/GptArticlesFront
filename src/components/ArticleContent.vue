<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import EditorJS from '@editorjs/editorjs';

export default defineComponent({
  name: 'ArticleContent',

  props: {
    editable: {
      default: false,
      type: Boolean
    },
    content: {
      type: Object as PropType<any>,
      required: true
    }
  },

  emits: ['update:content'],

  mounted() {
    const vueEmit = this.$emit
    const editorJsElement = this.$refs.editorjs as HTMLElement

    const editor = new EditorJS({
      /**
       * Enable/Disable the read only mode
       */
      readOnly: !this.editable,

      /**
       * Wrapper of Editor
       */
      holder: editorJsElement,

      tools: {
        // Add some plugins here
      },

      data: this.content,

      //defaultBlock: 'embed',

      onChange: !this.editable ? undefined : function (api, event) {
        editor.save().then((savedData) => {
          vueEmit('update:content', savedData)
        })
      }
    })
  },
})
</script>

<template>
  <div ref="editorjs"></div>
</template>

<style>
.ce-block__content, .ce-toolbar__content {
  max-width: calc(100% - 80px) !important;
}

.cdx-block {
  max-width: 100% !important;
}
</style>
