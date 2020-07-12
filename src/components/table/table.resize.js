import { $ } from '@core/dom'

export function resizeHandler ($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize
  let value = 0

  const position = type === 'col' ? 'bottom' : 'right'
  $resizer.css({
    [position]: -5000 + 'px'
  })

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({ right: -delta + 'px' })
    } else {
      const delta = e.pageY - coords.bottom
      $resizer.css({ bottom: -delta + 'px' })
      value = coords.height + delta
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    $resizer.css({
      right: 0,
      bottom: 0
    })

    if (type === 'col') {
      $parent.css({ width: value + 'px' })
      const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
      cells.forEach(el => el.style.width = value + 'px')
    } else {
      $parent.css({ height: value + 'px' })
    }
  }
}
