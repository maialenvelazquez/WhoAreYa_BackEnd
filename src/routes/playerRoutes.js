const express = require('express');
const router = express.Router();

// 1. INPORTAZIOA: Ziurtatu 'getSolution' gehitzen duzula hemen!
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

// --- IBILBIDEAK (ROUTES) ---

// 1. GET /solution/:gameNumber
// GARRANTZITSUA: Honek /:id baino LEHENAGO joan behar du.
// Bestela, Express-ek pentsatuko du "solution" hitza ID bat dela.
router.get('/solution/:gameNumber', getSolution);

// 2. GET players (Guztiak)
router.get('/', getPlayers);

// 3. GET /players/:id (Banakakoa)
// Hau beherago jarri dugu, goikoak lehentasuna izateko.
router.get('/:id', getPlayerById);

// --- ADMIN ROUTES ---

// POST players
router.post('/', protect, authorize('admin'), playerValidator, postPlayer);

// PUT /players/:id
router.put('/:id', protect, authorize('admin'), playerValidator, putPlayer);

// DELETE /players/:id
router.delete('/:id', protect, authorize('admin'), deletePlayer);

module.exports = router;