import express from 'express'
import { logInfo } from '../utils/logger'
const router = express.Router()

router.get('/ping', (_req, res) => {
  logInfo('someone pinged here!')
  res.status(200).send('pong!')
})

router.get('/health', (_req, res) => {
  res.status(200).json('Health check OK!')
})

export default router
