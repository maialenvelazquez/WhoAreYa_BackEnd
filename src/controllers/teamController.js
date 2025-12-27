const Player = require('../models/Player');

exports.getTeams = async (req, res) => {
    try {
        const teams = await Player.distinct('teamId');

        res.status(200).json({
                success: true,
                data: teams
        });
    }catch(error) {
        res.status(500).json({
                success: false,
                error: {
                    code: "SERVER_ERROR",
                    message: "Errorea taldeak eskuratzerakoan"
                }
        });
    }
};