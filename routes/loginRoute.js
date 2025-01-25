const express = require('express');
const router = express.Router();
const { postlogin, postsignin, verifyToken, requist,refreshAccessToken ,requist2} = require('../controls/login');

router.route('/login').post(postlogin);
router.route('/signin').post(postsignin);
router.route('/refresh-token').post(refreshAccessToken);

router.use(verifyToken);

router.route('/requist').get(requist);
router.route('/requist2').get(requist2);

module.exports = router;
