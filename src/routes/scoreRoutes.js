const express = require("express");

const {
  index,
  edit,
  update,
<<<<<<< HEAD
  destroy
=======
  destroy,
  stats,
>>>>>>> 13615bd (Points Table)
} = require("../controllers/scoreController");

const router = express.Router();

router.get("/", index);

router.get("/update", edit);
router.post("/update", update);

<<<<<<< HEAD
router.post("/:id/delete", destroy);

module.exports = router;
=======
router.get("/stats", stats);

router.post("/:id/delete", destroy);

module.exports = router;
>>>>>>> 13615bd (Points Table)
