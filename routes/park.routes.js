const express = require('express')
const router = express.Router()

// Aquí los endpoints
const Park = require ('./../models/park.model')

//AQUI YA ESTA EL PARKS

router.get('/new', (req, res) => {
    res.render ('parks/new-park')
})

router.post('/new', (req, res) => { 
    const { name, description, active } = req.body
    console.log (req.body)
    

    Park
        .create({ name, description, active })
        .then(() => res.redirect('/parks/new'))
        .catch(err => console.log("Error en la BBDD", err))

})

















module.exports = router