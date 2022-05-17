import { createBot } from 'mineflayer'
import timer from './timer'

const SERVER_DATA = {
  host: 'mc-server',
  //host: '0.0.0.0',
  port: 25565,
  version: '1.15',
}

const spawnBot = (name: string) => {
  return new Promise(async (resolve, reject) => {
    await timer(15000)

    const bot = createBot({
      ...SERVER_DATA,
      username: name,
    })

    bot.once('spawn', () => {
      console.log(`Created bot "${name}"`)
      resolve(name)
    })

    bot.on('error', (err) => {
      reject(err)
    })
  })
}

export default spawnBot