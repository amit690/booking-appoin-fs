const express = require('express');
const userControler = require('../controlers/user');

const router = express.Router();  // This should be `router`, not `rouer`

router.post('/user', userControler.postcontroler);
router.get('/user', userControler.getcontroler);
router.delete('/user/:userid', userControler.deleteuser);
router.put('/user/:userid', userControler.putuser);

module.exports = router;
