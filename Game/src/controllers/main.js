function index(_req, res) {
    res.render("main");
}

function about(_req, res) {
    res.render("main/sobre");
}

function game(_req, res) {
    res.render("main/game");
}

module.exports = { index, about, game };