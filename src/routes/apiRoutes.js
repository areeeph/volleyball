const express = require("express");

const {
  index,
  update,
  reset,
  update_score,
  create_set,
  deleteSet
} = require("../controllers/apiController");

const router = express.Router();

router.get("/", index);


router.put("/update", update);
router.put("/update-score", update_score);
router.post("/create-set", create_set);
router.post("/delete-set" , deleteSet)



router.get("/reset", reset);


module.exports = router;