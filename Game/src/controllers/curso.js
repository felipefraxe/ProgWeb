const models = require('../models/index');
const { Curso, Area }  = models;
const { Op } = models.sequelize;

async function index(_req, res) {
    Curso.findAll().then(cursos => {
        res.render("curso/index", { cursos: cursos.map(curso => curso.toJSON()) })
    })
}

async function read(req, res) {
    const { id } = req.params;
    Curso.findByPk(id, { include: Area }).then(curso => res.render("curso/read", { curso: curso.toJSON() }));
};

async function create(req, res) {
    if(req.route.methods.get)
        return res.render("curso/create");

    const { sigla, nome, descricao, area } = req.body;
    Curso.create({ sigla, nome, descricao, areaId: area })
    .then(() => res.redirect("/curso"))
    .catch(err => console.log(err));
};

async function update(req, res) {
    const { id } = req.params;
    const curso = await Curso.findByPk(id);
    if(req.route.methods.get)
        return res.render("curso/update", { curso: curso.toJSON() });

    curso.sigla = req.body.sigla;
    curso.nome = req.body.nome;
    curso.descricao = req.body.descricao;
    curso.areaId = req.body.area;
    curso.save().then(() => res.redirect("/curso"));
};

async function remove(req, res) {
    if(!req.route.methods.post)
        return;
    const { id } = req.params;
    Curso.destroy({ where: { id } })
    .then(() => res.redirect("/curso"));
};

module.exports = { index, read, create, update, remove }