import RCON from "rcon-srcds"
import parseSNBT from "./parseSNBT"

const getVillagerData = async (rcon: RCON, name: string) => {
   const response = await rcon.execute(`execute as @e[name=${name}] run data get entity @s`) as string

  try {
    const parsed = parseSNBT(response.split(`${name} has the following entity data: `)[1])

    return parsed
  } catch(e) {
    return null
  }
}

export default getVillagerData