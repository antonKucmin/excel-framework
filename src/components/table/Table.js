import { ExcelComponents } from '@core/ExcelComponents'
import { createTable } from '@/components/table/table.template'
import { resizeHandler } from '@/components/table/table.resize'
import { isCell, nextSelector, shouldResize } from '@/components/table/table.function'
import { TableSelection } from '@/components/table/TableSelection'
import { $ } from '@core/dom'

export class Table extends ExcelComponents {
  static className = 'excel__table'

  constructor ($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  toHTML () {
    return createTable(200)
  }

  prepare () {
    this.selection = new TableSelection()
  }

  init () {
    super.init()

    const $cell = this.$root.findSecond('[data-id="0:0"]')
    this.selectCell($cell)


    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
    })
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  onMousedown (event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      this.selection.selectedCol(event, this.$root)
    }
  }

  onKeydown(event) {
    const keys = ['Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']
    const { key } = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.findSecond(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }
}


