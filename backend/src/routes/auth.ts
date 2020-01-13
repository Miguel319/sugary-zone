import { Router } from "express";
const { signup } = require("../controllers/auth");

const router = Router();

router.post('/signup', signup);

module.exports = router;