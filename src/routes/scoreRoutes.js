const express = require("express");

const {
  index,
  edit,
  update,
  destroy,
  stats,
  topsix,
  topsixUpdate,
  positions,
  positionsUpdate
} = require("../controllers/scoreController");

const router = express.Router();

router.get("/", index);

router.get("/update", edit);
router.post("/update", update);

router.get("/stats", stats);
router.get("/top-six", topsix);
router.get("/top-six-update", topsixUpdate);

router.get("/positions", positions);
router.get("/positions-update", positionsUpdate);

router.post("/:id/delete", destroy);

module.exports = router;
