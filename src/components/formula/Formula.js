import { ExcelComponents } from '@core/ExcelComponents'
import { $ } from '@core/dom'

export class Formula extends ExcelComponents {
  static className = 'excel__formula'

  constructor ($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  toHTML () {
    return `
      <div class="info">fx</div>
      <div class="input" id="formula-input" contenteditable spellcheck="false"></div>
    `
  }

  init() {
    super.init()

    this.$formula = this.$root.findSecond('#formula-input')
    this.$on('table:select', $cell => {
      this.$formula.text($cell.text())
    })
    this.$on('table:input', $cell => {
      this.$formula.text($cell.text())
    })
  }

  onInput (event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown (event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}
