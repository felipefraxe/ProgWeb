const { Router } = require("express");
const mainController = require("../controllers/main");
const areaController = require("../controllers/area");
const cursoController = require("../controllers/curso");
const router = Router();

router.get("/", mainController.index);
router.get("/sobre", mainController.about);
router.get("/game", mainController.game);

router.get("/area", areaController.index);

router.get('/curso' , cursoController.index);
router.get('/curso/read/:id' , cursoController.read);
router.get('/curso/create' , cursoController.create);
router.post('/curso/create' , cursoController.create);
router.get('/curso/update/:id' , cursoController.update);
router.post('/curso/update/:id' , cursoController.update);
router.post('/curso/remove/:id' , cursoController.remove);

module.exports = router;