const express = require("express");

const {
  index,
  update,
  reset
} = require("../controllers/apiController");

const router = express.Router();

router.get("/", index);


router.put("/update", update);

router.get("/reset", reset);

module.exports = router;