import { NextFunction, Request, Response } from "express"

import hexifyPosition from "../utils/hexifyPosition"
import getVillagerData from "../utils/getVillagerData"
import secondsSinceEpoch from "../utils/secondsSinceEpoch"

const appendDataToRequest = async (req: any, res: Response, next: NextFunction) => {
  if(secondsSinceEpoch() - req.app.locals.lastRead.timestamp > 5) {
    const botsAvailability = req.app.locals.appStatus.bots
    
    const positions = []
    const positionsRounded = []
    const seedBytes = []

    for(let i = 0; i < botsAvailability.length; i++) {
      if(botsAvailability[i]) {
        const data = await getVillagerData(req.app.locals.rconInstance, `villager-${i}`)
        
        const [x, y, z] = data['Pos'] as number[]
        const positionProcessed = {
          x: (x % 16) - 1,
          z: z - 1,
        }

        positions.push(positionProcessed)
        positionsRounded.push({
          x: Math.round(positionProcessed.x),
          z: Math.round(positionProcessed.z),
        })
        seedBytes.push(hexifyPosition(positionProcessed))
      }
    }

    req.app.locals.lastRead.data.positions = positions
    req.app.locals.lastRead.data.positionsRounded = positionsRounded
    req.app.locals.lastRead.data.seed = req.app.locals.lastRead.data.seed.concat(seedBytes).slice(-32)

    req.app.locals.lastRead.timestamp = secondsSinceEpoch()
  }

  next()
}

export default appendDataToRequest