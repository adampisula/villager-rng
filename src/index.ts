import RCON from 'rcon-srcds'
import express from 'express'

import buildCage from './utils/buildCage'
import spawnVillager from './utils/spawnVillager'
import connectRCON from './utils/connectRCON'
import spawnBot from './utils/spawnBot'

import statusRouter from './routes/status'
import dataRouter from './routes/data'

import appendDataToRequest from './middleware/appendDataToRequest'

const PORT = 80

const VILLAGER_AMOUNT = 4
const VILLAGER_SPACING = 128
const CAGE_WIDTH = 16
const CAGE_DEPTH = 16

const app = express()

app.locals.appStatus = {
  rcon: false,
  bots: Array(VILLAGER_AMOUNT).fill(false),
}

app.locals.lastRead = {
  timestamp: 0,
  data: {
    positions: [],
    positionRoundeds: [],
    seed: [],
  },
}

app.use(statusRouter)

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
  console.log('Waiting for RCON')

  connectRCON(new RCON({
    host: 'mc-server',
    //host: '0.0.0.0',
    port: 25575,
    timeout: 5000,
  }), 'minecraft')
    .then(async (rcon) => {
      app.locals.appStatus.rcon = true
      app.locals.rconInstance = rcon

      app.use(appendDataToRequest)
      app.use(dataRouter)

      console.log('RCON connection established')

      await rcon.execute('setworldspawn -8 4 -8')
      await rcon.execute('gamerule doDaylightCycle false')
      await rcon.execute('gamerule doWeatherCycle false')
      
      await rcon.execute('time set noon')
      await rcon.execute('weather clear')
      await rcon.execute('kill @e[type=minecraft:villager]')

      const botNames = Array(VILLAGER_AMOUNT).fill('').map((_, i) => `bot-${i}`)
      const villagerNames = Array(VILLAGER_AMOUNT).fill('').map((_, i) => `villager-${i}`)

      for(let i = 0; i < VILLAGER_AMOUNT; i++) {
        await spawnBot(botNames[i])

        const {x, y, z, botX, botY, botZ} = await buildCage(rcon, i * VILLAGER_SPACING,  0, 11, CAGE_WIDTH, CAGE_DEPTH)

        await spawnVillager(rcon, villagerNames[i], x, z, y)
        await rcon.execute(`tp ${botNames[i]} ${botX} ${botY} ${botZ}`)

        app.locals.appStatus.bots[i] = true
      }

      const fillSeedInterval = setInterval(() => {
        const dummyReq = {
          app
        }

        appendDataToRequest(dummyReq, null, () => {
          if(app.locals.lastRead.data.seed.length == 32) {
            console.log('Filled seed array')
            clearInterval(fillSeedInterval)
          }
        })
      }, 7500)
    })
})