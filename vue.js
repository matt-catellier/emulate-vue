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
        this.replaceText(element)
      }
    }
  }

  replaceText(node) {
    let text = node.textContent
    let result = ''

    let replacing = false; 
    let cursor = 0; // to change text inside {{ }}
    for(let i = 0; i < text.length; i++) {
      if(!replacing) {
        if(text[i] === "{" && text[i + 1] === "{") { 
          replacing = true
          result += text.substring(cursor, i) // add up to {{ to result
          cursor = i // set cursor to start replacing
        }
      } else if(replacing) {
        if(text[i] === "}" && text[i + 1] === "}") { 
          // i.e. cursor {{' hello '}} i
          replacing = 0
          result += this.data[text.substring(cursor + 2, i - 1).trim()]
          cursor = i + 2
        }
      }
    }
    node.textContent = result
  }
}