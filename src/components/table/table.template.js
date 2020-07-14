const CODES = {
  A: 65,
  Z: 90
}
const colsCount = CODES.Z - CODES.A + 1

function toChar () {
  const chars = []
  for (let i = 0; i < colsCount; i++) {
    chars.push(String.fromCharCode(CODES.A + i))
  }
  return chars
}

function emptyCel (row) {
  return new Array(colsCount)
      .fill('')
      .map(createCel(row))
      .join('')
}

function createCel (row) {
  return function (_, col) {
    return `
      <div 
      class="cell" 
      contenteditable
      data-col="${col}"
      data-type="cell"
      data-id="${row}:${col}"
      ></div>
    `
  }
}

function createColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(content, index) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index || ''}
        ${resize}
       </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

export function createTable (rowsCount = 15) {
  const rows = []

  const cols = toChar().map(createColumn).join('')
  rows.push(createRow(cols))

  for (let row = 0; row < rowsCount; row++) {
    rows.push(createRow(emptyCel(row), row + 1))
  }
  return rows.join('')
}
