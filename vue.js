class Vue {
  constructor(options) {
    const app = document.querySelector(options.el)
    const originalHtml = app.innerHTML

    let newHtml = ''
    Object.entries(options.data).forEach(([key, value]) => { 
      newHtml = originalHtml.replace(`{{ ${key} }}`, value) 
    })

    app.innerHTML = newHtml
  }
}