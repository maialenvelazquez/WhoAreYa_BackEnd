const express = require('express');
const router = express.Router();

const{getLeagues} = require('../controllers/leagueController');

router.get('/', getLeagues);

module.exports = router;