const express = require("express");
const axios = require("axios");
const { character, house, middle } = require("../../db.js")

const router = express();

router.get("/", async (req, res) => {
    try {
        let charactersDb = await character.findAll()
        const allCharacts = [];

        charactersDb.forEach(async (e) => {
            const { id, name, species, wizard, eyeColour, hairColour, hogwartsStudent, actor } = e.dataValues;
            
            let hogwartsHouse = "sin house";
            
            const instamceMiddle = await middle.findOne({
                where: { characterId: id }
            });
            
            if (instamceMiddle) {
                const houseId = instamceMiddle.dataValues.houseId;

                const instanceHouse = await house.findOne({
                    where: { id: houseId }
                });

                hogwartsHouse = instanceHouse.dataValues.name;
            };
            // esta chimvada no sirve, linea de abajo, sirve cuando esta en lalinea 14, acá no pushea
            allCharacts.push({name, species, wizard, eyeColour, hairColour, hogwartsStudent, actor})
        })
       
        res.json(allCharacts)

    } catch (error) {
        console.log(error)
    }
});

router.post("/", async (req, res) => {
    try {
        const charactersApi = await axios.get("https://hp-api.herokuapp.com/api/characters");
        charactersApi.data.forEach(async (e) => {
            const newCharacter = await character.create({
                name: e.name,
                species: e.species,
                wizard: e.wizard,
                eyeColour: e.eyeColour,
                hairColour: e.hairColour,
                hogwartsStudent: e.hogwartsStudent,
                actor: e.actor
            });

            const instanceHouse = await house.findOne({
                where: { name: e.house }
            });

            await newCharacter.addHouse(instanceHouse)

        });
        res.send("character in DB");

    } catch (error) {
        console.log(error)
    }
})

module.exports = router;