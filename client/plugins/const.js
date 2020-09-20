import Vue from 'vue'

Vue.prototype.$const = {
  MAIN_COLOR: '#A80C33',
  BASE_COLOR: '#D4D3D2',
  BASE_COLOR2: '#FFF',
  ACCENT_COLOR: '#5CB4ED',
  VALIDATE: {
    nameMax: 50,
    emailMax: 255,
    passwordMin: 8,
    passwordMax: 16
  }
}
