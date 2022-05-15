import { Router } from 'express'

const router = Router()

router.get('/status', (req, res) => {
  return res.json(
    req.app.locals.appStatus
  )
})

export default router