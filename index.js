const isObj = val => val && !Array.isArray(val) && typeof val === 'object'

const sort = (replacer, seen) => (key, val) => {
  if (replacer)
    val = replacer(key, val)

  if (!isObj(val))
    return val

  if (seen.has(val))
    return seen.get(val)

  const ret = Object.entries(val).sort(
    ([ak, av], [bk, bv]) =>
      isObj(av) === isObj(bv) ? ak.localeCompare(bk)
      : isObj(av) ? 1
      : -1
  ).reduce((set, [k, v]) => {
    set[k] = v
    return set
  }, {})

  seen.set(val, ret)
  return ret
}

module.exports = (obj, replacer, space = 2) =>
  JSON.stringify(obj, sort(replacer, new Map()), space)
