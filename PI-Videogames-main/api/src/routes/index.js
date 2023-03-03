const {Router} = require("express");
const videogameRouter = require("./videogameRouter");
const genreRouter = require("./genreRouter");

const router = Router();

router.use("/videogames", videogameRouter)
router.use("/genres", genreRouter);





module.exports = router;