//Jokalarien zerrenda bistaratzeko orria
exports.renderAdminHome = (req, res) => {
    res.render('admin/index');
};

//Jokalari berria sortzeko formularioa duen orria
exports.renderNewPlayer = (req, res) => {
    res.render('admin/newPlayer');
};

//Jokalari bat editatzeko formularioa duen orria
exports.renderEditPlayer = (req, res) => {
    const playerId = req.params.id;
    res.render('admin/editPlayer', {playerId});
};