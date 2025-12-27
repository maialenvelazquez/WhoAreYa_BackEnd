const express = require('express');
const router = express.Router();

const {getPlayers, getPlayerById, postPlayer, putPlayer, deletePlayer} = require('../controllers/playerController');
const{protect} = require('../middleware/auth');
const{authorize} = require('../middleware/auth');

const{playerValidator} = require('../validators/playerValidator');

//GET players
router.get('/', getPlayers);

//GET /players/:id
router.get('/:id', getPlayerById);

//POST players
router.post('/', protect, authorize('admin'), playerValidator, postPlayer);

//PUT /players/:id
router.put('/:id', protect, authorize('admin'), playerValidator, putPlayer);

//DELETE /players/:id
router.delete('/:id', protect, authorize('admin'), deletePlayer);

module.exports = router;