import Vue from 'vue'

Vue.prototype.$const = {
  MAIN_COLOR: '#bd004d',
  BASE_COLOR: '#FFF3E0',
  // BASE_COLOR: '#f6f5f2',
  BASE_COLOR2: '#fff',
  ACCENT_COLOR: 'orange',
  VALIDATE: {
    nameMax: 50,
    emailMax: 255,
    passwordMin: 8,
    passwordMax: 16,
    profileMax: 200,
    professionMax: 20,
    titleMax: 255,
    priceMin: 50,
    priceMax: 10000,
    imageSizeMax: 5 // MB
  }
}
