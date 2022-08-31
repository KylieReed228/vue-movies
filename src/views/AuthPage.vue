<template>
  <v-app>
    <div class="auth">
      <div class="auth__block secondary">
        <v-tabs v-model="tab" class="auth__tabs">
          <v-tab class="secondary">Login</v-tab>
          <v-tab class="secondary">Registration</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" class="secondary">
          <v-tab-item class="auth__tabs-item">
            <login-form />
          </v-tab-item>
          <v-tab-item class="auth__tabs-item">
            <registration-form />
          </v-tab-item>
        </v-tabs-items>
      </div>
    </div>
  </v-app>
</template>
<script>
import LoginForm from '@/components/LoginForm.vue'
import RegistrationForm from '@/components/RegistrationForm.vue'
export default {
  components: {
    LoginForm,
    RegistrationForm
  },
  data () {
    return {
      tab: 0
    }
  }
}
</script>
<style lang="scss">
.auth {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &__block {
    width: 400px;
    border-radius: 15px;
    padding: 15px;
  }

  &__tabs {
    display: flex;
    justify-content: center;
  }
}
</style>
