class Dom {
  constructor (selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }

  clear() {
    this.html('')
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  append(elementDomNode) {
    if (elementDomNode instanceof Dom) {
      elementDomNode = elementDomNode.$el
    }
    if (Element.prototype.append) {
      this.$el.append(elementDomNode)
    } else {
      this.$el.appendChild(elementDomNode)
    }
    return this
  }

  get data () {
    return this.$el.dataset
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  findSecond(selector) {
    return $(this.$el.querySelector(selector))
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => {
      this.$el.style[key] = styles[key]
    })
  }

  addClass(className) {
    this.$el.classList.add(className)
    return this
  }

  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')
      return {
        row: Number(parsed[0]),
        col: Number(parsed[1])
      }
    }
    return this.data.id
  }

  focus() {
    this.$el.focus()
    return this
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
