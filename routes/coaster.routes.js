const express = require('express')
const router = express.Router()

const Coaster = require('./../models/coaster.model')
const Park = require('./../models/park.model')


//RUTAS GET <===============

router.get('/new', (req, res) => {
    //res.render('coasters/new-coaster')
    Park
        .find()
        .then(allParks => {
            res.render('coasters/new-coaster', { allParks })
        })
        .catch(err => console.log("Error en la BBDD", err))

})



router.get('/', (req, res) => {
    Coaster
        .find() 
        .populate ('park')
        .then(allCoasters => {
            res.render('coasters/coasters-index', {allCoasters})   
         })
})

router.get('/:id', (req, res) => { 
    Coaster
        .findById(req.params.id)
        .populate ('park')
        .then(theCoaster => { 
            res.render('coasters/coaster-details', { theCoaster } )
            
            
        })
})
router.get('/delete/:id', (req, res) => { 
    Coaster
        .findByIdAndRemove(req.params.id)
    .then (res.redirect ('/coasters'))
})

//RUTAS POST <==============    
router.post('/new', (req, res) => {
    const { name, description, inversions, length, park } = req.body

    Coaster
        .create({ name, description, inversions, length, park })
        .then(res.redirect('/coasters/new'))
})



// Aquí los endpoints


module.exports = router