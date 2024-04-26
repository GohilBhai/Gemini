const express = require("express");
const { summerizeController } = require("../controllers/openaiController.js");

const router = express.Router();

router.post("/summary", summerizeController);

module.exports = router;
