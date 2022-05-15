import type RCON from "rcon-srcds";

const spawnVillager = (rcon: RCON, name: string, x: number, z: number, y=4) => {
  const command = `summon minecraft:villager ${x} ${y} ${z} {VillagerData:{profession:farmer,level:99,type:plains},Invulnerable:1,PersistenceRequired:1,CustomName:"\\"${name}\\""}`
  return rcon.execute(command)
}

export default spawnVillager