<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { Modal } from 'bootstrap'
import { ProtectedProfileService } from '@/service/ProtectedProfileService'

export type FieldType = "nickname" | "password";

export type FieldTypeMap<T> = { [FIELD in FieldType]: T};

const fieldTitles : FieldTypeMap<string> = {
  nickname: "Nickname",
  password: "Password"
}

const inputTypes : FieldTypeMap<string> = {
  nickname: "text",
  password: "password"
}

const defaultConfirmPassTitle = "Password";
const passChangeConfirmTitle = "Old Password";

type FieldHandler = (newValue: string, currentPassword: string) => Promise<void>

const fieldChangeHandlers : FieldTypeMap<FieldHandler> = {
  "nickname": ProtectedProfileService.getInstance().changeNickname,
  "password": ProtectedProfileService.getInstance().changePassword,
}

export default defineComponent({
  name: 'ChangeFieldModal',

  props: {
    field: {
      type: Object as PropType<FieldType>,
      required: true
    },
    showing: {
      type: Boolean,
      required: true
    },
  },

  emits: ['update:showing', 'change'],

  computed: {
    confirmPassTitle() {
      return this.field == 'password' ? passChangeConfirmTitle : defaultConfirmPassTitle
    }
  },

  data() {
    return {
      modal: null as null | Modal,
      newValue: '',
      password: '',
      error: null as null | string,
      fieldTitles,
      inputTypes
    }
  },

  methods: {
    changeField() {
      fieldChangeHandlers[this.field](this.newValue, this.password).then(() => {
        this.closeModal();
        this.newValue = ""
        this.password = ""
        this.$emit('change', fieldTitles[this.field]);
      }).catch(e => {
        this.error = e;
      })
    },
    closeModal() {
      this.$emit('update:showing', false);
      (this.modal as Modal).hide();
    }
  },

  mounted() {
    // @ts-ignore
    this.modal = new Modal(this.$refs.modal, {
      // keyboard: false, // Optionally, you can customize the modal behavior
      // backdrop: false // Based on your requirements
    });

    (this.$refs.modal as any).addEventListener('hidden.bs.modal', (event: any) => {
      this.$emit('update:showing', false);
    });
  },

  beforeUnmount() {
    (this.modal as Modal).dispose();
  },

  watch: {
    showing(newValue) {
      if (newValue) {
        (this.modal as Modal).show();
      } else {
        (this.modal as Modal).hide();
      }
    },
    newValue() {
      this.error = null;
    },
    password() {
      this.error = null;
    }
  }
})
</script>

<template>
  <div class="modal" ref="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Change {{field}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="alert alert-danger" role="alert" v-if="error">
            {{ error }}
          </div>
          <form>
            <div class="mb-3">
              <label for="valueInput" class="form-label">{{fieldTitles[field]}}</label>
              <input :type="inputTypes[field]" class="form-control" id="valueInput" v-model="newValue">
            </div>
            <div class="mb-3">
              <label for="confirmPasswordInput" class="form-label">{{ confirmPassTitle }}</label>
              <input type="password" class="form-control" id="confirmPasswordInput" v-model="password">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" data-bs-dismiss="modal" class="btn btn-secondary">Cancel</button>
          <button type="button" class="btn btn-dark" @click="changeField">Change</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
