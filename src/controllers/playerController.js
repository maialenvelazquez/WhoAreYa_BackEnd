const Player = require('../models/player');
const {validationResult} = require('express-validator');

//GET players: jokalari guztiak zerrendatu
exports.getPlayers = async (req, res) => {
   try{
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page-1)*limit;

      const players = await Player.find().skip(skip).limit(limit);
      const total = await Player.countDocuments();

      res.status(200).json({
        success: true,
        data: players,
        pagination: {
            total,
            page,
            pages: Math.ceil(total / limit)
        }
      });

   }catch (error) {
     res.status(500).json({
          success: false,
          error: {
              code: "SERVER_ERROR",
              message: "Errorea jokalariak eskkuratzerakoan"
          }
     });
   }
};

//GET players /:id: IDaren arabera, jokalari espezifiko bat lortu
exports.getPlayerById = async (req, res) => {
      try{
        const player = await Player.findById(req.params.id);

        if(!player) {
           return res.status(404).json({
               success: false,
               error: {
                    code: "NOT_FOUND",
                    message: "Ez da existitzen ID hori duen jokalaririk"
               }
           });
        }

        res.status(200).json({
               success: true,
               data: player
        });

      }catch(error) {
        res.status(500).json({
               success: false,
               error: {
                    code: "SERVER_ERROR",
                    message: "Errorea jokalaria bilatzerakoan"
               }
        });
      }
};

//POST players: Jokalari berri bat sortu
exports.postPlayer = async (req, res) => {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
             return res.status(400).json({
                  success: false,
                  error: {
                      code: "VALIDATION_ERROR",
                      message: "Datuak baliogabeak dira",
                      details: errors.array()
                  }
             });
         }

         const newPlayer = await Player.create(req.body);

         res.status(201).json({
                  success: true,
                  data: newPlayer,
                  message: "Jokalaria sortu da"
         });

      }catch(error) {
         res.status(500).json({
                  success: false,
                  error: {
                      code: "SERVER_ERROR",
                      message: "Errorea jokalaria sortzerakoan"
                  }
         });
      }
};

//PUT players/:id: Jokalari baten eremu guztiak eguneratu
exports.putPlayer = async (req, res) => {
     try{
        const player = await Player.findOneAndUpdate(
            {id: req.params.id},
            req.body,
            {new: true, runValidators: true}
        );

        if (!player) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "NOT_FOUND",
                    message: "Ez da eguneratu nahi den jokalaria existitzen"
                }
            });
        }

        res.status(200).json({
                success: true,
                data: player,
                message: "Jokalaria eguneratu da"
        });

     }catch(error) {
        res.status(500).json({
                success: false,
                error: {
                    code: "SERVER_ERROR",
                    message: "Errorea jokalaria eguneratzerakoan"
                }
        });
     }
};

//DELETE players/:id: Jokalari bat ezabatu
exports.deletePlayer = async (req, res) => {
    try {
       const player = await Player.findOneAndDelete({id:parseInt(req.params.id)});

       if(!player) {
          return res.status(404).json({
                success: false,
                error: {
                    code: "NOT_FOUND",
                    message: "Ez da existitzen ezabatu nahi den jokalaria"
                }
          });
       }

       res.status(200).json({
                success: true,
                message: "Jokalaria ezabatu da"
       });

    }catch(error) {
       res.status(500).json({
                success:false,
                error: {
                    code: "SERVER_ERROR",
                    message: "Errorea jokalaria ezabatzerakokan"
                }
       });
    }
};

//GET /solution/:gameNumber: Eguneko jokalaria lortu
exports.getSolution = async (req, res) => {
    try{
       const gameNumber = parseInt(req.params.gameNumber);

       const players = await Player.find().sort({id:1});
       const index = gameNumber % players.length;

       const solutionPlayer = players[index];

       res.status(200).json({
            success: true,
            data: solutionPlayer
       });

    }catch (error) {
       res.status(500).json({
            success: false,
            error: {
                code: "SERVER_ERROR",
                message: "Errorea eguneko jokalaria lortzerakoan"
            }
       });
    }
};
