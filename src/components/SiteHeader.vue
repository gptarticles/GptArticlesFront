<script lang="ts">

import { useUserStore } from '@/stores/UserStore'
import { defineComponent } from 'vue'
import AssuranceModal from '@/components/modal/AssuranceModal.vue'
export default defineComponent({
  components: { AssuranceModal },

  data() {
    return {
      logoutModalShowing: false,
      userStore: useUserStore()
    }
  },

  computed: {
    isUserAuthenticated() {
      return this.userStore.hasUser()
    }
  },

  methods: {
    isActiveRoute(routeName: string) {
      return this.$router.currentRoute.value.name == routeName
    },
    showLogoutModal() {
      this.logoutModalShowing = true
    },
    sureLogout() {
      this.userStore.clearUser();
    }
  },
})
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
    <div class="container">
      <!-- Nav logo -->
      <RouterLink :to="{name: 'home'}" class="navbar-brand">GPT Articles</RouterLink>

      <!-- Toggler for mobile devices -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Nav menu for authed users -->
      <div v-if="isUserAuthenticated" class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink :to="{name: 'my-articles'}"
                        class="nav-link"
                        :class="{'active': isActiveRoute('my-articles')}"
                        id="myArticlesLink"
                        href="#">
              My articles
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{name: 'my-profile'}"
                        class="nav-link"
                        :class="{'active': isActiveRoute('my-profile')}"
                        id="myArticlesLink"
                        href="#">
              Profile
            </RouterLink>
          </li>
          <li class="nav-item logout-item">
            <a class="nav-link" href="#" @click.prevent="showLogoutModal">Log out</a>
          </li>
        </ul>
      </div>

      <!-- Nav menu for non-authed users -->
      <div v-else class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink :to="{name: 'login'}" class="nav-link">Sign in</RouterLink>
          </li>
        </ul>
      </div>

    </div>
  </nav>

  <!-- Assurance Modal for log out -->
  <AssuranceModal title="Log out"
                  cancel-label="Cancel"
                  sure-label="Log out"
                  @assure="sureLogout"
                  v-model:showing="logoutModalShowing">
    <p>Would you really like to log out?</p>
  </AssuranceModal>
</template>

<style scoped>
.logout-item a:hover {
  color: #ff4646;
}
</style>
