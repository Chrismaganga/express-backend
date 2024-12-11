import { Router } from 'express'
import express from 'express'
import * as home from '../controllers/home'


const router = Router()

router.get('/',home.indexPage)
router.get('/docs',home.docsPage)

module.exports = router