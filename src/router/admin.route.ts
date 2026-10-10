import express from 'express'
import { authenticateToken } from "../middleWare/authMiddleware";
import { requireAdmin} from "../middleWare/admin"
const router = express.router();

router.use(authenticateToken,
  requireAdmin,)


router.get('/admin/dashboard')
router.get('/admin/users/')
router.get('/admin/users/:id')
router.patch('/admin/users/:id/role')
router.patch('/admin/users/:id/status')
router.patch('/admin/users/:id/report-setting')
router.delete('/admin/users/:id')


router.post('admin/emails/preview')
router.post('admin/emails/send')
router.get('admin/emails/:campaignId')

router.post('admin/users/:id/reports')
router.get('admin/users/:id/reports')

export {router as adminRouter}