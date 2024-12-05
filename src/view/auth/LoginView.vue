<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '@/store/UserStore'
import { AuthService } from '@/service/AuthService'
import {Tooltip} from "bootstrap";

const authService = AuthService.getInstance();

export default defineComponent({
  data() {
    return {
      loginData: {
        username: '',
        password: ''
      },
      isFilled: false,
      isLoggingIn: false,
      tooltipText: 'Please enter your nickname or email',
      alertShown: false,
      alertText: ''
    }
  },

  created() {
    const userStorage = useUserStore();
    if (userStorage.hasUser()) {
      this.$router.push({name: 'home'});
      return;
    }
  },

  mounted() {
    this.updateTooltip()
  },

  beforeUnmount() {
    const wrapper = this.$refs.loginButtonWrapper;
    // @ts-ignore
    Tooltip.getOrCreateInstance(wrapper).dispose()
  },

  methods: {
    openRegisterPage() {
      this.$router.push({name: 'register'})
    },
    login() {
      this.isLoggingIn = true;
      authService.login(this.loginData.username, this.loginData.password).then(() => {
        this.isLoggingIn = false;
        this.$router.push({name: 'home'})
      }).catch((e) => {
        this.alertText = e
        this.alertShown = true;
        this.isLoggingIn = false;
      })
    },

    updateTooltip() {
      const wrapper = this.$refs.loginButtonWrapper;
      // @ts-ignore
      Tooltip.getOrCreateInstance(wrapper).setContent({'.tooltip-inner': this.tooltipText})
    }
  },

  watch: {
    loginData: {
      handler(newData) {
        this.alertShown = false;
        if (newData.login === '') {
          this.isFilled = false;
          this.tooltipText = 'Please enter your nickname or email';
        } else if (newData.password === '') {
          this.isFilled = false;
          this.tooltipText = 'Please enter your password'
        } else {
          this.tooltipText = "You're good to sign in"
          this.isFilled = true;
        }
        this.updateTooltip();
      },
      deep: true
    }
  }
});
</script>

<template>
  <main class="container my-5 d-flex justify-content-center">
    <div class="row align-items-center">
      <div class="col">
        <h1 class="mt-4 mb-4">Sign in</h1>
        <div class="alert alert-danger" role="alert" v-if="alertShown">
          {{ alertText }}
        </div>
        <div class="mb-3">
          <label for="usernameInput" class="form-label">Nickname or email</label>
          <input type="text"
                 class="form-control"
                 id="usernameInput"
                 v-model="loginData.username"
                 placeholder="Nickname or email">
        </div>
        <div class="mb-4">
          <label for="passwordInput" class="form-label">Password</label>
          <input type="password"
                 class="form-control"
                 id="passwordInput"
                 v-model="loginData.password"
                 placeholder="xxxxxxxxx">
        </div>
        <span class="d-inline-block w-100"
              ref="loginButtonWrapper"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="default">
          <button type="button"
                  class="btn btn-dark btn-login mb-3"
                  :disabled="isLoggingIn || !isFilled"
                  @click="login">
            <span>Sign in</span>
          </button>
        </span>
        <button type="button"
                class="btn btn-outline-dark btn-reg-now mb-4"
                @click="openRegisterPage">
          <span class="text-muted me-1">You aren't registered yet?</span>
          <span>Sign up</span>
        </button>
      </div>

    </div>
  </main>
</template>

<style scoped>
.form-control {
  border-radius: 0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.btn-login {
  width: 100%;
  border-radius: 0;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.btn-reg-now {
  width: 100%;
  border-radius: 0;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
</style>
