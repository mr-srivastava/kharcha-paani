const express = require('express');
const groupController = require('../controllers/groupController');
const router = express.Router();

router.get('/', groupController.getGroups);
router.post('/', groupController.createGroup);
router.get('/:id', groupController.getGroupById);

module.exports = router;
