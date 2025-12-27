const express = require('express');
const router = express.Router();

const{protect, authorize} = require('../middleware/auth');

const{renderAdminHome, renderNewPlayer, renderEditPlayer} = require('../controllers/adminController');

const{getPlayers, getPlayerById, postPlayer, putPlayer, deletePlayer, getSolution} = require('../controllers/playerController');

const{getTeams} = require('../controllers/teamController');

const{getLeagues} = require('../controllers/leagueController');

router.use(protect);

//Ikuspegi zerrendatua
router.get('/', renderAdminHome);

//Formularioa duen ikuspegia
router.get('/players/new', renderNewPlayer);

//Editatu inprimakia duen ikuspegia
router.get('/players/edit/:id', renderEditPlayer);

router.get('/players/:id', protect, getPlayerById);

router.post('/players', protect, authorize('admin'), postPlayer);

router.get('/players', protect, authorize('admin'), getPlayers);

router.put('/players/:id', protect, authorize('admin'), putPlayer);

router.delete('/players/:id', protect, authorize('admin'), deletePlayer);

router.get('/solution/:gameNumber', protect, getSolution);

router.get('/teams', protect, getTeams);

router.get('/leagues', protect, getLeagues);

module.exports = router;