import { $ } from '@core/dom'
// import { range } from '@core/utils'
import { matrix } from '@/components/table/table.function'

export class TableSelection {
  static className = 'selected'
  constructor() {
    this.group = []
    this.current = null
  }

  select(element) {
    this.clearClasses()
    element.focus().addClass(TableSelection.className)
    this.group.push(element)
    this.current = element
  }

  selectGroup(elements = []) {
    this.clearClasses()
    this.group = elements
    this.group.forEach(element => element.addClass(TableSelection.className))
  }

  clearClasses () {
    this.group.forEach(el => el.removeClass(TableSelection.className))
    this.group = []
  }

  selectedCol (event, $root) {
    const target = $(event.target)
    if (event.shiftKey) {
      console.log(target.id(true))
      const ids = matrix(this.current, target)
      const cells = ids.map(id => $root.findSecond(`[data-id="${id}"]`))
      this.selectGroup(cells)
    } else {
      this.select(target)
    }
  }
}
