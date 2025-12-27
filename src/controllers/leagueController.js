const Player = require('../models/Player');

exports.getLeagues = async (req, res) => {
   try{
        const leagues = await Player.distinct('leagueId');

        res.status(200).json({
                success: true,
                data: leagues
        });

   }catch(error) {
        res.status(500).json({
                success: false,
                error: {
                    code: "SERVER_ERROR",
                    message: "Errorea ligak eskuratzerakoan"
                }
        });
   }
};