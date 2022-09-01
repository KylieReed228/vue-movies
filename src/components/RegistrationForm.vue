<template>
  <form class="registration-form">
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
      type="password"
      label="Password"
      required
      @blur="$v.password.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="repeatPassword"
      :error-messages="repeatPasswordErrors"
      class="mb-2"
      type="password"
      label="Repeat password"
      required
      @blur="$v.repeatPassword.$touch()"
    ></v-text-field>
    <v-btn class="mb-5" @click="submit" :loading="isLoading">
      submit
    </v-btn>
    <div class="registration-form__error">{{ error }}</div>
  </form>
</template>
<script>
import {
  required,
  sameAs,
  email,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
export default {
  name: 'RegistrationForm',
  data () {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      isLoading: false
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(12)
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    async submit () {
      if (!this.email || !this.password || !this.repeatPassword) {
        this.$v.email.$touch()
        this.$v.password.$touch()
        this.$v.repeatPassword.$touch()
      }
      if (
        this.$v.email.$invalid ||
        this.$v.password.$invalid ||
        this.$v.repeatPassword.$invalid
      ) return
      this.isLoading = true
      const formData = {
        email: this.email,
        password: this.password
      }
      await this.$store.dispatch('auth/handleRegister', formData)
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
      !this.$v.password.maxLength &&
        errors.push('password must be at most 12 characters long')
      !this.$v.password.minLength &&
        errors.push('password must be at least 6 characters long')
      !this.$v.password.required && errors.push('password is required')
      return errors
    },
    repeatPasswordErrors () {
      const errors = []
      if (!this.$v.repeatPassword.$dirty) return errors
      !this.$v.repeatPassword.required &&
        errors.push('repeat password is required')
      !this.$v.repeatPassword.sameAsPassword &&
        errors.push("passwords don't match")
      return errors
    },
    ...mapState({
      error: state => state.auth.errorRegister
    })
  }
}
</script>
<style lang="scss">
.registration-form {
  &__error {
    color: red;
    font-size: 14px;
  }
}
</style>
