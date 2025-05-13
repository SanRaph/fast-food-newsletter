// routes/newsletterRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { subscribe, unsubscribe, send } = require('../controllers/newsletterController');

router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);
router.post('/send', auth, send); // protected route for admins

module.exports = router;