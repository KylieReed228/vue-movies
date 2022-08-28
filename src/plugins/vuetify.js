import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: {
        primary: colors.grey.darken2, 
        secondary: colors.grey.lighten2, 
        accent: colors.grey.darken1
      },
      dark: {
        primary: colors.grey.lighten2, 
        secondary: colors.grey.darken3,
        accent: colors.grey.darken2
      }
    }
  }
})
