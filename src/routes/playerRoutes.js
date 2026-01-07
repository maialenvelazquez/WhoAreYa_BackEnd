const express = require('express');
const router = express.Router();

const {
    getPlayers,
    getPlayerById,
    postPlayer,
    putPlayer,
    deletePlayer,
    getSolution
} = require('../controllers/playerController');

const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/auth');
const { playerValidator } = require('../validators/playerValidator');

router.get('/solution/:gameNumber', getSolution);

router.get('/', getPlayers);

router.get('/:id', getPlayerById);


router.post('/', protect, authorize('admin'), playerValidator, postPlayer);

router.put('/:id', protect, authorize('admin'), playerValidator, putPlayer);

router.delete('/:id', protect, authorize('admin'), deletePlayer);

module.exports = router;