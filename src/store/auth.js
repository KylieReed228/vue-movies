import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

import ErrorMessages from '@/ErrorMessages'

import router from '@/router'

import { auth } from '@/main'

export default {
  state: {
    user: {},
    errorLogin: '',
    errorRegister: ''
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setLoginError (state, payload) {
      state.errorLogin = payload
    },
    setRegisterError (state, payload) {
      state.errorRegister = payload
    }
  },
  actions: {
    async handleRegister ({ commit }, { email, password }) {
      try {
        await createUserWithEmailAndPassword(auth, email, password).then(data =>
          commit('setUser', data.user)
        )
        router.push({ name: 'main' })
      } catch (error) {
        commit('setRegisterError', ErrorMessages[error.code])
      }
    },
    async handleLogin ({ commit }, { email, password }) {
      try {
        await signInWithEmailAndPassword(auth, email, password).then(data =>
          commit('setUser', data.user)
        )
        router.push({ name: 'main' })
      } catch (error) {
        commit('setLoginError', ErrorMessages[error.code])
      }
    },
    async handleSignOut ({ commit }) {
      try {
        signOut(auth).then(() => commit('setUser', null))
        router.push({ name: 'auth' })
      } catch (error) {
        console.log(error)
      }
    }
  },
  namespaced: true
}
