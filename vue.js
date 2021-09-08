class Vue {
  constructor(options) {
    const app = document.querySelector(options.el)
    app.innerHTML = options.data.message
  }
}