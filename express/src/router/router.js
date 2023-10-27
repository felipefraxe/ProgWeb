const { Router } = require("express");
const mainController = require("../controllers/main");
const router = Router();

router.get("/", mainController.index);
router.get("/sobre", mainController.about);
router.get("/game", mainController.game);


module.exports = router;