import { $ } from '@core/dom'

export class Excel {
  constructor (selector, options) {
    if (!selector) {
      throw new Error('Error no selector')
    }
    // #app
    this.$el = $(selector)

    this.components = options.components || []
  }

  getRoot() {
    // корневой див
    const $root = $.create('div', 'excel')

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)

      $el.html(component.toHTML()) // Установка содержимого для элемента

      $root.append($el) // добовляем элемент в шоблон
      return component
    })
    return $root
  }

  render() {
    this.$el.append(this.getRoot())

    this.components.forEach(component => component.init())
  }
}
