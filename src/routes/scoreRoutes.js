const express = require("express");

const {
  index,
  edit,
  update,
  destroy,
  stats,
} = require("../controllers/scoreController");

const router = express.Router();

router.get("/", index);

router.get("/update", edit);
router.post("/update", update);

router.get("/stats", stats);

router.post("/:id/delete", destroy);

module.exports = router;
