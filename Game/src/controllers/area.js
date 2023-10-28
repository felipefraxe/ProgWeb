const models = require("../models/index");
const { Area } = models;

async function index(_req, res) {
    Area.findAll().then(areas => {
        res.render("area/index", { areas: areas.map(area => area.toJSON()) });
    })
    .catch(err => console.log(err));
}

module.exports = { index };