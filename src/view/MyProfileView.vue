<script lang="ts">
import { defineComponent } from 'vue'
import PencilIcon from '@/components/icons/PencilIcon.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { ProtectedProfileService } from '@/service/ProtectedProfileService'
import type { UserProfileInfo } from '@/dto/user/UserProfileInfo'
import ChangeFieldModal from '@/components/modal/ChangeFieldModal.vue'

export default defineComponent({
  name: 'ProfileView',
  components: { ChangeFieldModal, LoadingSpinner, PencilIcon },

  data() {
    return {
      isLoading: true,
      profileInfo: undefined as undefined | UserProfileInfo,
      changeNicknameModalShowing: false,
      changePasswordModalShowing: false,
      successAlert: null as string | null,
      successAlertId: 0
    }
  },

  mounted() {
    ProtectedProfileService.getInstance().getProfileInfo().then((profileInfo) => {
      this.profileInfo = profileInfo;
      this.isLoading = false;
    })
  },

  methods: {
    openChangeNameModal() {
      this.changeNicknameModalShowing = true
    },
    openChangePasswordModal() {
      this.changePasswordModalShowing = true
    },
    onFieldChanged(fieldTitle: string) {
      this.successAlert = fieldTitle + " has been changed!"
      this.successAlertId += 1;
      const currentAlertId = +this.successAlertId

      setTimeout(() => {
        if (this.successAlertId == currentAlertId) {
          this.successAlert = null;
        }
      }, 2000)
    }
  }
})
</script>

<template>
  <main class="container my-5 flex-grow-1">
    <div class="row">
      <div class="col col-lg-8 col-xl-6">

        <h1 class="mb-5">Profile</h1>

        <div v-if="isLoading">
          <LoadingSpinner />
        </div>

        <div class="alert alert-success" role="alert" v-if="successAlert">
          {{ successAlert }}
        </div>

        <form v-if="!isLoading">
          <fieldset>
            <div class="mb-3">
              <label for="emailInput" class="form-label">Email address</label>
              <input type="email" class="form-control" id="emailInput" :value="profileInfo!.email" disabled>
            </div>
            <div class="mb-3">
              <label for="nicknameInput" class="form-label">Nickname</label>
              <div class="d-flex">
                <input type="text" class="form-control" id="nicknameInput" :value="profileInfo!.nickname" disabled>
                <button type="button" class="btn btn-dark ms-1" @click="openChangeNameModal">
                  <PencilIcon />
                </button>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <div class="w-100">
                <button type="button" class="btn btn-dark" @click="openChangePasswordModal">
                  Change password
                </button>
              </div>
            </div>
          </fieldset>
        </form>

      </div>
    </div>
  </main>

  <ChangeFieldModal
    field="nickname"
    v-model:showing="changeNicknameModalShowing"
    @change="onFieldChanged" />

  <ChangeFieldModal
    field="password"
    v-model:showing="changePasswordModalShowing"
    @change="onFieldChanged" />
</template>

<style scoped>

</style>
