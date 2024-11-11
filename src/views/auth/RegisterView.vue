<script lang="ts">

import { defineComponent } from 'vue'
import { Tooltip } from 'bootstrap'
import { AuthService } from '@/service/AuthService'
import { useUserStore } from '@/stores/UserStore'
import type { UserRegisterData } from '@/dto/user/UserRegisterData'

const authService = AuthService.getInstance()

/**
 * Register view
 */
export default defineComponent({
  data() {
    return {
      registerData: <UserRegisterData & { repeatPassword: string }>{
        login: '',
        email: '',
        password: '',
        repeatPassword: ''
      },

      isFilled: false,
      isRegistering: false,
      tooltipText: 'Please enter nickname',
      alertShown: false,
      alertText: ''
    }
  },

  created() {
    const userStorage = useUserStore()
    if (userStorage.hasUser()) {
      this.$router.push({ name: 'home' })
      return
    }
  },

  mounted() {
    this.updateTooltip()
  },

  beforeUnmount() {
    const wrapper = this.$refs.registerButtonWrapper
    // @ts-ignore
    Tooltip.getOrCreateInstance(wrapper).dispose()
  },

  methods: {
    openLoginPage() {
      this.$router.push({ name: 'login' })
    },

    register() {
      this.isRegistering = true
      authService.register(this.registerData).then(() => {
        this.isRegistering = false
        this.openLoginPage()
      }).catch(e => {
        this.alertText = e as string
        this.alertShown = true
        this.isRegistering = false
      })
    },

    updateTooltip() {
      const wrapper = this.$refs.registerButtonWrapper
      // @ts-ignore
      Tooltip.getOrCreateInstance(wrapper).setContent({ '.tooltip-inner': this.tooltipText })
    }
  },

  watch: {
    registerData: {
      handler(newData) {
        if (newData.login === '') {
          this.isFilled = false
          this.tooltipText = 'Please enter nickname'
        } else if (newData.email === '') {
          this.isFilled = false
          this.tooltipText = 'Please enter email'
        } else if (newData.password === '') {
          this.isFilled = false
          this.tooltipText = 'Please enter password'
        } else if (newData.repeatPassword === '') {
          this.isFilled = false
          this.tooltipText = 'Please repeat the password'
        } else if (newData.password !== newData.repeatPassword) {
          this.isFilled = false
          this.tooltipText = 'The passwords are not the same!'
        } else {
          this.tooltipText = "You're good to sign up"
          this.isFilled = true
        }
        this.updateTooltip()
      },
      deep: true
    }
  }
})
</script>

<template>
  <main class="container my-5 d-flex justify-content-center">
    <div class="row align-items-center">
      <div class="col">
        <h1 class="mt-4 mb-4">Sign up</h1>

        <div class="alert alert-danger" role="alert" v-if="alertShown">
          {{ alertText }}
        </div>

        <!-- Login input -->
        <div class="mb-3">
          <label for="loginInput" class="form-label">Nickname</label>
          <input type="text"
                 class="form-control"
                 id="loginInput"
                 v-model="registerData.login"
                 placeholder="Nickname">
        </div>

        <!-- Email input -->
        <div class="mb-3">
          <label for="emailInput" class="form-label">Email</label>
          <input type="email"
                 class="form-control"
                 id="emailInput"
                 v-model="registerData.email"
                 placeholder="jhon@example.com">
        </div>

        <!-- Password input -->
        <div class="mb-4">
          <label for="passwordInput" class="form-label">Password</label>
          <input type="password"
                 class="form-control"
                 id="passwordInput"
                 v-model="registerData.password"
                 placeholder="xxxxxxxxx">
        </div>

        <!-- Password repeat input -->
        <div class="mb-4">
          <label for="passwordRepeatInput" class="form-label">Repeat the password</label>
          <input type="password"
                 class="form-control"
                 id="passwordRepeatInput"
                 v-model="registerData.repeatPassword"
                 placeholder="xxxxxxxxx">
        </div>

        <span class="d-inline-block w-100"
              ref="registerButtonWrapper"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="default"
        >
          <button type="button"
                  class="btn btn-dark btn-login mb-3"
                  @click="register"
                  :disabled="!isFilled || isRegistering">
          <span>Sign up</span>
        </button>
        </span>


        <button type="button"
                class="btn btn-outline-dark btn-reg-now mb-4"
                @click="openLoginPage">
          <span class="text-muted me-1">You're already singed up?</span>
          <span>Sign in</span>
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
