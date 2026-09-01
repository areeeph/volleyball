const express = require("express");

const {
  index,
  edit,
  update,
  destroy
} = require("../controllers/scoreController");

const router = express.Router();

router.get("/", index);


router.get("/update", edit);
router.post("/update", update);

router.post("/:id/delete", destroy);

module.exports = router;