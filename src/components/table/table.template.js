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

function emptyCel () {
  return new Array(colsCount)
      .fill('')
      .map(createCel)
      .join('')
}

function createCel () {
  return `
    <div class="cell" contenteditable></div>
  `
}

function createCol (col) {
  return `
    <div class="column">${col}</div>
  `
}

function createRow(content, index) {
  return `
    <div class="row">
      <div class="row-info">${index || ''}</div>
      <div class="row-data">${content}</div>
    </div>
  `
}

export function createTable (rowsCount = 15) {
  const rows = []

  const cols = toChar().map(createCol).join('')
  rows.push(createRow(cols))

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(emptyCel(), i + 1))
  }
  return rows.join('')
}
