const parseSNBT = (data: string, parseNestedJSON=true) => {
  data = data.replaceAll('minecraft:', '__minecraft__')
  data = data.replaceAll('0b', 'false')
  data = data.replaceAll('1b', 'true')

  const re = new RegExp(/([a-z0-9]\w+(\.[a-z0-9]\w+)?)\s*:/, 'gim')
  const reFloatDoubleLong = new RegExp(/(-?\d+(\.?\d+)?)[dfsL]/, 'gim')
  const reNestedJson = new RegExp(/'(.*)'/, 'gim')

  let jsonString = data.replaceAll(re, '"$1":')
  jsonString = jsonString.replaceAll(reFloatDoubleLong, '$1')
  
  if(parseNestedJSON) {
    jsonString = jsonString.replaceAll(reNestedJson, '$1')
  } else {
    jsonString = jsonString.replaceAll(reNestedJson, (match) => {
      return `"${match.replaceAll('"', '\\"').slice(1, -1)}"`
    })
  }
  
  jsonString = jsonString.replaceAll('__minecraft__', 'minecraft:')

  return JSON.parse(jsonString)
}

export default parseSNBT