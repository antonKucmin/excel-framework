import { ExcelComponents } from '@core/ExcelComponents'

export class Formula extends ExcelComponents {
  static className = 'excel__formula'

  constructor ($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click']
    })
  }

  toHTML () {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput (event) {
    console.log(event.target.textContent.trim(), this.name, '------------------event--------------------')
  }

  onClick (event) {
    console.log(event, '--click----------------event--------------------')
  }
}
