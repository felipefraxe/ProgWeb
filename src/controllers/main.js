function index(_req, res) {
    res.render("main");
}

function about(_req, res) {
    res.render("main/sobre");
}

module.exports = { index, about };