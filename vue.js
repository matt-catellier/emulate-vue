class Vue {
  constructor(options) {
    this.root = document.querySelector(options.el)
    this.data = options.data
    
    this.render()
  }

  render() {
    // start at root 
    const stack = [this.root]
    while(stack.length) {
      console.log(stack)
      // take dom element off stack
      let element = stack.pop()
      // add all its children to the stack
      if(element.hasChildNodes()) {
        stack.push(...element.childNodes)
      }

      // if the element is a text node, then replace contents with data
      if(element.nodeType === Node.TEXT_NODE) {
        let newTextContent = ''
        Object.entries(this.data).forEach(([key, value]) => { 
          newTextContent = element.textContent.replace(new RegExp(`{{ ${key} }}`, "g"), value) 
        })
        element.textContent = newTextContent
      }
    }
  }
}