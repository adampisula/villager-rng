import RCON from "rcon-srcds"
import timer from "./timer"

const connectRCON = async (rconInstance: RCON, password: string) => {
  while(!rconInstance.connected) {
    try {
      await rconInstance.authenticate(password)
    } catch(e) {}

    console.log('.')
    await timer(5000)
  }

  return rconInstance
}

export default connectRCON