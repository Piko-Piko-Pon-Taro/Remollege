import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
});

require('../plugins/const.js')

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: 'BASE_COLOR',
    values: [
        { 
            name: 'MAIN_COLOR', 
            value: Vue.prototype.$const.MAIN_COLOR
        },
        { 
            name: 'BASE_COLOR', 
            value: Vue.prototype.$const.BASE_COLOR
        },
        { 
            name: 'BASE_COLOR2', 
            value: Vue.prototype.$const.BASE_COLOR2 
        },
        { 
            name: 'ACCENT_COLOR', 
            value: Vue.prototype.$const.ACCENT_COLOR 
        },
        
      ],
    }
}