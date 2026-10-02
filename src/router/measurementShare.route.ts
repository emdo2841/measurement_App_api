import express from 'express'
import { authenticateToken } from '../middleWare/authMiddleware'
import {
  createMeasurementShare,
  getSharedMeasurement,
  revokeMeasurementShare,
} from '../controller/measurementShare'

const router = express.Router()

// Public: the recipient does not need to log in.
router.get('/shared/measurements/:token',getSharedMeasurement,)

// Protected: only the owning tailor can create a link.
router.post(
  '/measurement/:id/share',
  authenticateToken,
  createMeasurementShare,
)

// Protected: only the owning tailor can revoke a link.
router.delete(
  '/measurement/:id/share/:shareId',
  authenticateToken,
  revokeMeasurementShare,
)

export { router as measurementShareRouter }