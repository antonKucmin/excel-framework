import { DomListener } from '@core/DomListener'

export class ExcelComponents extends DomListener {
  constructor ($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []

    this.prepare()
  }

  // настройка компонента до init
  prepare() {
  }

  // return template component
  toHTML() {
    return ''
  }

  $emit(eventName, ...args) {
    this.emitter.emit(eventName, ...args)
  }

  $on(eventName, fn) {
    const unsub = this.emitter.subscribe(eventName, fn)
    this.unsubscribers.push(unsub)
  }

  // инициализация компонента
  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
