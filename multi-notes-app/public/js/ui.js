export function formatUuidInput(e) {
  if (
    (e.key !== 'Backspace' && e.target.value.length === 8) ||
    e.target.value.length === 13 ||
    e.target.value.length === 18 ||
    e.target.value.length === 23
  ) {
    e.target.value += '-'
  }
}

export function showErrors(errors, errorsElement) {
  errorsElement.innerText = errors.join('\n')
}
