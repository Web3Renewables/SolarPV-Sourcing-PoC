const removeDuplicates = (arr, key) => {
  const removeUndefined = arr.filter(v => v !== undefined)
  return removeUndefined.filter((v, i, a) => a.findIndex(v2 => (v2[key] === v[key])) === i)
}

export {
  removeDuplicates
}