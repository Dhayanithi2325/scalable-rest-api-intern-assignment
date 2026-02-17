const express = require('express');
const { createTask, getTasks, deleteTask } = require('../controllers/task.controller');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();
router.post('/', auth, createTask);
router.get('/', auth, getTasks);
router.delete('/:id', auth, deleteTask);
module.exports = router;