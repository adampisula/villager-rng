import { Router } from 'express'

const router = Router()

router.get('/data/position/:disableRounding?', (req, res) => {
  if(req.params.disableRounding) {
    return res.json(
      req.app.locals.lastRead.data.positions
    )
  } else {
    return res.json(
      req.app.locals.lastRead.data.positionsRounded
    )
  }
})

router.get('/data/seed', (req, res) => {
  return res.json(
    req.app.locals.lastRead.data.seed
  )
})

export default router