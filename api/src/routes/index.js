const express = require("express");

const characters = require("./middleWares/character.js");
const houses = require("./middleWares/house.js");

const router = express();

router.use("/characters", characters);
router.use("/houses", houses);

module.exports = router;