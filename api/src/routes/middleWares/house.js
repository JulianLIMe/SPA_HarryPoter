const express = require("express");
const housesHogwarts = require("./housesHogwarts.json")

const { house } = require("../../db.js");

const router = express();

router.use(express.json());

router.use("/", async (req, res, next) => {
    try {
        housesHogwarts.forEach(async (e) => {
            await house.findOrCreate({
                where: { name: e.house, id: e.id }
            })
        })
        
    } catch (error) {
        console.log(error)
    }
    next();
})

router.get("/", async (req, res) => {
    try {
        let housesDb = await house.findAll()
        if (housesDb) {
            housesDb = housesDb.map((e) => e.dataValues);
            return res.json(housesDb);
        }
        return res.send("sin resultados");

    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
