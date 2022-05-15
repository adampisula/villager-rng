import type RCON from "rcon-srcds"

const buildCage = async (rcon: RCON, startX: number, startZ: number, startY=3, width=8, depth=8, wallHeight=2) => {
  const commands = [
    `fill ${startX} ${startY} ${startZ} ${startX + width + 1} ${startY + wallHeight} ${startZ + depth + 1} minecraft:cobblestone replace`,
    //`fill ${startX + 1} ${startY + 1} ${startZ + 1} ${startX + width} ${startY + wallHeight} ${startZ + depth} minecraft:air replace`,
    `fill ${startX} ${startY + 1} ${startZ} ${startX + width + 1} ${startY + wallHeight} ${startZ + depth + 1} minecraft:air replace`,
    `fill ${startX - 2} ${startY} ${startZ - 2} ${startX - 4} ${startY + 2} ${startZ - 4} minecraft:cobblestone replace`,
    `fill ${startX - 3} ${startY + 1} ${startZ - 3} ${startX - 3} ${startY + 2} ${startZ - 3} minecraft:air replace`,
  ]

  for(let i = 0; i < commands.length; i++) {
    await rcon.execute(commands[i])
  }

  return {
    x: startX + width / 2,
    y: startY + 1,
    z: startZ + depth / 2,

    botX: startX - 3,
    botY: startY + 1,
    botZ: startZ - 3,
  }
}

export default buildCage