<template>
  <form class="login-form">
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="Email"
      required
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :error-messages="passwordErrors"
      class="mb-2"
      type="password"
      label="Password"
      required
      @blur="$v.password.$touch()"
    ></v-text-field>
    <v-btn class="mb-5" @click="submit" :loading="isLoading">
      submit
    </v-btn>
    <div class="login-form__error">{{ error }}</div>
  </form>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'LoginForm',
  data () {
    return {
      email: 'admin',
      password: 'admin',
      isLoading: false
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    async submit () {
      if (!this.email || !this.password) {
        this.$v.email.$touch()
        this.$v.password.$touch()
      }
      if (this.$v.email.$invalid || this.$v.password.$invalid) return
      this.isLoading = true
      const formData = {
        email: this.email,
        password: this.password
      }
      await this.$store.dispatch('auth/handleLogin', formData)
      this.isLoading = false
    }
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('password is required')
      return errors
    },
    ...mapState({
      error: state => state.auth.errorLogin
    })
  }
}
</script>
<style lang="scss">
.login-form {
  &__error {
    color: red;
    font-size: 14px;
  }
}
</style>
