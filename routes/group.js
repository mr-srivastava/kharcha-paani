const express = require('express');
const groupController = require('../controllers/groupController');
const router = express.Router();

router.get('/', groupController.getGroups);
router.post('/', groupController.createGroup);
router.get('/:id', groupController.getGroupById);
router.put('/:id', groupController.updateGroup);

module.exports = router;
