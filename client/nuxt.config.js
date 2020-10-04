import colors from 'vuetify/es5/util/colors'

require('dotenv').config()

let apiUrl
let host
let port
const { SKYWAY_API_KEY } = process.env

if (process.env.NODE_ENV === 'production') {
  apiUrl = 'https://api-dot-pikopikopon1.uc.r.appspot.com'
  host = 'localhost'
  port = process.env.PORT
} else {
  apiUrl = 'http://localhost:3000'
  host = '0.0.0.0'
  port = '3001'
}

export default {
  mode: 'universal',
  server: {
    host,
    port
  },

  env: {
    apiUrl,
    SKYWAY_API_KEY
  },
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#'
    },
    titleTemplate: '%s - 大学専用オンライン通話サービス',
    title: 'Remollege',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Remollege' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://pikopikopon1.uc.r.appspot.com'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Remollege | 大学専用オンライン通話サービス'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          '現在は早稲田大学生のみ使用可能ですが、随時対応していく予定です🙇‍♂️'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content:
          'https://storage.googleapis.com/remollege-storage/static/main_visual.png'
      },
      { name: 'twitter:card', content: 'summary' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~plugins/const.js', '~plugins/validate.js'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify', '@nuxtjs/google-analytics'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://auth.nuxtjs.org/
    '@nuxtjs/auth',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    // Doc: https://nuxt-socket-io.netlify.app/
    'nuxt-socket-io',
    '@nuxtjs/toast'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: apiUrl
  },
  /*
   ** auth module configuration
   */
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login_callback',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: `${apiUrl}/auth/waseda`,
            method: 'post',
            propertyName: 'accessToken'
          },
          logout: false,
          user: {
            url: `${apiUrl}/auth/user`,
            method: 'get',
            propertyName: 'user'
          }
        },
        tokenRequired: true,
        tokenType: 'bearer',
        globalToken: true,
        autoFetchUser: true
      },
      waseda: {
        _scheme: 'oauth2',
        authorization_endpoint: 'https://accounts.google.com/o/oauth2/auth',
        scope: ['openid', 'profile', 'email'],
        client_id: process.env.GOOGLE_CLIENT_ID,
        userinfo_endpoint: false
      }
    }
  },
  /*
   ** io module configuration
   ** See https://nuxt-socket-io.netlify.app/configuration
   */
  io: {
    sockets: [
      {
        url: apiUrl,
        vuex: {
          actions: [
            // When "key" is received,
            // dispatch action "value"
            { someOneSitsDown: 'rooms/SOCKET_someOneSitsDown' },
            { someOneStandsUp: 'rooms/SOCKET_someOneStandsUp' },
            { someOneSendChat: 'chats/SOCKET_someOneSendChat' }
          ]
        }
      }
    ]
  },
  /*
   ** toast module configuration
   ** See https://www.npmjs.com/package/@nuxtjs/toast
   */
  toast: {
    position: 'top-center',
    duration: 1500
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
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
  },
  /*
   * Google Analytics configuration
   */
  googleAnalytics: {
    id: 'GA_TRACKING_ID'
    // if you debug GA in dev mode, uncomment out next 4 lines.
    // debug: {
    //  enabled: true,
    //  sendHitTask: true
    // }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  router: {
    middleware: ['auth']
  }
}
