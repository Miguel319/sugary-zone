const { Router } = require("express");
const router = Router();
const {
  createCake,
  getCake,
  getCakes,
  updateCake,
  deleteCake
} = require("../controllers/cake");

// Cake routes
router.get("/", getCakes);
router.get("/:id", getCake);
router.post("/add", createCake);
router.put("/:id", updateCake);
router.delete("/:id", deleteCake);

module.exports = router;
