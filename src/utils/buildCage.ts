import type RCON from "rcon-srcds"

const buildCage = async (rcon: RCON, startX: number, startZ: number, startY=3, width=8, depth=8, wallHeight=2) => {
  const cageStart = {x: 0, y: 0, z: 0}
  const cageEnd = {x: 0, y: 0, z: 0}

  const cageHoleStart = {x: 0, y: 0, z: 0}
  const cageHoleEnd = {x: 0, y: 0, z: 0}
  const botPos = {botX: 0, botY: 0, botZ: 0}

  const cageLocation: string = process.env.CAGE_LOCATION || 'center'

  switch(cageLocation) {
    case 'top-left':
      cageStart.x = startX - 2
      cageStart.y = startY
      cageStart.z = startZ - 2

      cageEnd.x = startX - 4
      cageEnd.y = startY + 2
      cageEnd.z = startZ - 4

      cageHoleStart.x = startX - 3
      cageHoleStart.y = startY + 1
      cageHoleStart.z = startZ - 3

      cageHoleEnd.x = startX - 3
      cageHoleEnd.y = startY + 2
      cageHoleEnd.z = startZ - 3

      botPos.botX = startX - 3
      botPos.botY = startY + 1
      botPos.botZ = startZ - 3
      break
    case 'top-right':
      cageStart.x = startX + width + 3
      cageStart.y = startY
      cageStart.z = startZ - 2

      cageEnd.x = startX + width + 5
      cageEnd.y = startY + 2
      cageEnd.z = startZ - 4

      cageHoleStart.x = startX + width + 4
      cageHoleStart.y = startY + 1
      cageHoleStart.z = startZ - 3

      cageHoleEnd.x = startX + width + 4
      cageHoleEnd.y = startY + 2
      cageHoleEnd.z = startZ - 3

      botPos.botX = startX + width + 4
      botPos.botY = startY + 1
      botPos.botZ = startZ - 3
      break
    case 'bottom-left':
      cageStart.x = startX - 2
      cageStart.y = startY
      cageStart.z = startZ + depth + 3

      cageEnd.x = startX - 4
      cageEnd.y = startY + 2
      cageEnd.z = startZ + depth + 5

      cageHoleStart.x = startX - 3
      cageHoleStart.y = startY + 1
      cageHoleStart.z = startZ + depth + 4

      cageHoleEnd.x = startX - 3
      cageHoleEnd.y = startY + 2
      cageHoleEnd.z = startZ + depth + 4

      botPos.botX = startX - 3
      botPos.botY = startY + 1
      botPos.botZ = startZ + depth + 4
      break
    case 'bottom-right':
      cageStart.x = startX + width + 3
      cageStart.y = startY
      cageStart.z = startZ + depth + 3

      cageEnd.x = startX + width + 5
      cageEnd.y = startY + 2
      cageEnd.z = startZ + depth + 5

      cageHoleStart.x = startX + width + 4
      cageHoleStart.y = startY + 1
      cageHoleStart.z = startZ + depth + 4

      cageHoleEnd.x = startX + depth + 4
      cageHoleEnd.y = startY + 2
      cageHoleEnd.z = startZ + depth + 4

      botPos.botX = startX + width + 4
      botPos.botY = startY + 1
      botPos.botZ = startZ + depth + 4
      break
    default:
      cageStart.x = startX + Math.floor(width / 2) - 2 
      cageStart.y = startY - 4
      cageStart.z = startZ + Math.floor(depth / 2) - 2

      cageEnd.x = startX + Math.floor(width / 2) + 2
      cageEnd.y = startY - 2
      cageEnd.z = startZ + Math.floor(depth / 2) + 2

      cageHoleStart.x = startX + Math.floor(width / 2) - 1
      cageHoleStart.y = startY - 3
      cageHoleStart.z = startZ + Math.floor(depth / 2) - 1

      cageHoleEnd.x = startX + Math.floor(width / 2) + 1
      cageHoleEnd.y = startY - 2
      cageHoleEnd.z = startZ + Math.floor(depth / 2) + 1

      botPos.botX = startX + Math.floor(width / 2)
      botPos.botY = startY - 3
      botPos.botZ = startZ + Math.floor(depth / 2)
  }

  const commands = [
    // PLATFORM
    `fill ${startX} ${startY} ${startZ} ${startX + width + 1} ${startY + wallHeight} ${startZ + depth + 1} minecraft:cobblestone replace`,
    //`fill ${startX + 1} ${startY + 1} ${startZ + 1} ${startX + width} ${startY + wallHeight} ${startZ + depth} minecraft:air replace`, <- BUILD A CAGE WITH WALLS
    `fill ${startX} ${startY + 1} ${startZ} ${startX + width + 1} ${startY + wallHeight} ${startZ + depth + 1} minecraft:air replace`,

    // BOT CAGE
    `fill ${cageStart.x} ${cageStart.y} ${cageStart.z} ${cageEnd.x} ${cageEnd.y} ${cageEnd.z} minecraft:cobblestone replace`, 
    `fill ${cageHoleStart.x} ${cageHoleStart.y} ${cageHoleStart.z} ${cageHoleEnd.x} ${cageHoleEnd.y} ${cageHoleEnd.z} minecraft:air replace`,     
  ]

  for(let i = 0; i < commands.length; i++) {
    await rcon.execute(commands[i])
  }

  return {
    x: startX + width / 2,
    y: startY + 1,
    z: startZ + depth / 2,

    ...botPos,
  }
}

export default buildCage